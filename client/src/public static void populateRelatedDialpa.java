public static void populateRelatedDialpadRecord(Set<ID> taskIds){

    

//Skip the trigger function in certain test methods in order to test DialpadTaskRelationBatch

if (skipDialpadMatch && Test.isRunningTest()){

return;

}     

List<Task> newTasks = [SELECT Dialpad__IsDialpadCallLog__c, WhatId,

 WhoId, Dialpad__CallId__c, Dialpad_Matched__c, Account.PersonContactId,

 Account.IsPersonAccount, OwnerId, AccountId,

 Dialpad__PhoneNumber__c, Dialpad_Caller_Phone__c

  FROM Task

  WHERE Dialpad__IsDialpadCallLog__c = true AND CallType = 'Inbound'

     AND (Dialpad_Matched__c = false

   OR ((WhatId= NULL OR (NOT(What.Type = 'Case')))

   AND (Account.IsPersonAccount = true AND AccountId != NULL))) // SA-28: Added the OR condition to process Consumer Support dialpad tasks.

     AND (NOT(Subject LIKE '%Voicemail%'))

     AND Id IN :taskIds];

    

if (newTasks.isEmpty()){

return;

}

    

Set<ID> accountIds = new Set<ID>();

Set<String> phoneNums = new Set<String>();

Map<String,Task> processTaskMap = new Map<String,Task>();



Id consumerSupportCaseRecordTypeId = SObjectDescribeUtils.getRecordTypeIdByDevName('Case', 'Consumer_Support');

    

//Loop through tasks to populate the three collections above

for (Task t : newTasks) {



processTaskMap.put(t.Dialpad__CallId__c, t);

  

accountIds.add(t.AccountId);

phoneNums.add(t.Dialpad_Caller_Phone__c);

}

    

    accountIds.remove(null);

    phoneNums.remove(null);

    

    //Create a map of dialpad Call Id to Master Call Id

    Map<String,String> callIdToMasterIdMap = new Map<String,String>();

    for (Dialpad_Call_Event_Log__c cl : [SELECT Id, Call_Id__c, Master_Call_Id__c

                       FROM Dialpad_Call_Event_Log__c

                       WHERE Call_Id__c IN :processTaskMap.keySet()])

    {

      callIdToMasterIdMap.put(cl.Call_Id__c, cl.Master_Call_Id__c);

    }

    

    //Find all cases with a related Master Call Id



    //Dealer related maps

    Map<String,ID> masterCallIdCaseMap = new Map<String,ID>();

    Map<ID,ID> accountIdCaseMap = new Map<ID,ID>();

    Map<Id,Case> case2QueryMap = new Map<Id,Case>();



    //Consumer related maps

    Map<String,ID> masterCallIdCSCaseMap = new Map<String,ID>();

    Map<ID,ID> accountIdCSCaseMap = new Map<ID,ID>(); //Added under SA-669



    //2nd Case query

    for (Case c : [SELECT Id, Master_Call_Id__c, AccountId, OwnerId, Owner.Type

            FROM Case

            WHERE Master_Call_Id__c != null

            AND (Master_Call_Id__c IN :callIdToMasterIdMap.values()

              OR (AccountId IN :accountIds AND isClosed = false))

ORDER BY createdDate

           ])

    {

      masterCallIdCaseMap.put(c.Master_Call_Id__c, c);

      accountIdCaseMap.put(c.AccountId, c.Id);

      case2QueryMap.put(c.Id,c);

if(c.RecordTypeID == consumerSupportCaseRecordTypeId){

masterCallIdCSCaseMap.put(c.Master_Call_Id__c, c.Id);

accountIdCSCaseMap.put(c.AccountId, c.Id); //Added under SA-669 to include CS cases

}

    }

    

    //Find all leads with a related Master Call Id

    Map<String,ID> masterCallIdLeadMap = new Map<String,ID>();

    Map<String,ID> phoneLeadMap = new Map<String,ID>();

    Map<String,ID> phoneCaseMap = new Map<String,ID>();

    Set<Id> phoneCSCases = new Set<Id>();

    for (Lead l : [SELECT Id, Master_Call_Id__c, Phone, OwnerId, Owner.Type

            FROM Lead

            WHERE Master_Call_Id__c != null

            AND Master_Call_Id__c IN :callIdToMasterIdMap.values()])

    {

      masterCallIdLeadMap.put(l.Master_Call_Id__c, l);

    }

    

    if (!phoneNums.isEmpty()){

      for (List<sObject> sObjectList : [FIND :String.join(new List<String>(phoneNums), ',')

                       IN PHONE FIELDS

                       RETURNING Lead (Id, Master_Call_Id__c, Phone

                               WHERE Master_Call_Id__c != null)])

      {

        for (Lead l : (List<Lead>)sObjectList){

          phoneLeadMap.put(l.Phone.removeStart('+'), l.Id);

        }

      }

      

      for (List<sObject> sObjectList : [FIND :String.join(new List<String>(phoneNums), ',')

                       IN PHONE FIELDS

                       RETURNING Case (Id, Master_Call_Id__c, Dialpad_Phone__c, RecordTypeID, OwnerId, Owner.Type //Added RecordTypeID under SA-669

                               WHERE Master_Call_Id__c != null AND isClosed = false ORDER BY createdDate desc//Added under SA-669 to only include most recent case

                               )])

      {

        for (Case c : (List<Case>)sObjectList){

          String formattedDialpadPhone = c.Dialpad_Phone__c.removeStart('+');

          if (!case2QueryMap.containsKey(c.Id)) {

            case2QueryMap.put(c.Id, c);

          }



          if(c.RecordTypeID != consumerSupportCaseRecordTypeId){

            phoneCaseMap.put(formattedDialpadPhone, c.Id);

          } else if(!phoneCaseMap.keyset().contains(formattedDialpadPhone)){

            phoneCaseMap.put(formattedDialpadPhone, c.Id);

            phoneCSCases.add(c.id);

          }

        }

      }

    }

    

    

    Map<ID,Case> casesToUpdate = new Map<ID,Case>();

    Map<ID,Lead> leadsToUpdate = new Map<ID,Lead> ();

    Map<ID,ID> caseToCorrectAccountId = new Map<ID,ID>();

    

    //Loop through tasks and populate the related whoId (with a lead) or whatId (with a case) as needed

    for (String callId : processTaskMap.keySet()) {

      Task t = processTaskMap.get(callId);

      t.Dialpad_Matched__c = true;

      

      if (masterCallIdLeadMap.containsKey(callIdToMasterIdMap.get(callId))){

        ID leadId = masterCallIdLeadMap.get(callIdToMasterIdMap.get(callId)).Id;

        

        if (t.WhoId != null && !String.ValueOf(t.WhoId).startsWith('00Q') && t.whatId == null){

          t.WhoId = leadId;

        }

        

        if (!masterCallIdLeadMap.get(callIdToMasterIdMap.get(callId)).Owner.Type == 'User'){

          leadsToUpdate.put(leadId, new Lead(Id = leadId,OwnerId = t.ownerId));

        }

        

      }else if (masterCallIdCaseMap.containsKey(callIdToMasterIdMap.get(callId))){

        ID caseId = masterCallIdCaseMap.get(callIdToMasterIdMap.get(callId)).Id;

        if (t.WhoId != null && !String.ValueOf(t.WhoId).startsWith('00Q') && t.whatId == null){

          t.WhatId = caseId;

        // SA-28: updateTaskRelation takes care of unknown caller whatId Assignment.

        // This condition checks if the associated case is a consumer support case

        // and associated account is a person account.

        } else if (masterCallIdCSCaseMap.values().contains(caseId) && t?.Account?.IsPersonAccount){

          t.WhoId = t?.Account?.PersonContactId;

          t.WhatId = caseId;

        }

        

        if (!masterCallIdCaseMap.get(callIdToMasterIdMap.get(callId)).Owner.Type == 'User' && !masterCallIdCSCaseMap.containsKey(masterCallId) ){

          if (case2QueryMap.containsKey(caseId) && case2QueryMap.get(caseId).Owner.Type != 'User') {

            casesToUpdate.put(caseId, new Case(Id = caseId, OwnerId = t.ownerId));

          }   

        }  

      }else if (phoneLeadMap.containsKey(t.Dialpad_Caller_Phone__c)){

        ID leadId = phoneLeadMap.get(t.Dialpad_Caller_Phone__c);

        if (t.WhoId != null && !String.ValueOf(t.WhoId).startsWith('00Q') && t.whatId == null){

          t.WhoId = leadId;

        }

        

        if (!masterCallIdLeadMap.get(callIdToMasterIdMap.get(callId)).Owner.Type == 'User'){

          leadsToUpdate.put(leadId, new Lead(Id = leadId,OwnerId = t.ownerId));

        }

      }else if (accountIdCaseMap.containsKey(t.AccountId)){

        ID caseId = accountIdCaseMap.get(t.AccountId);

        if(t?.Account?.IsPersonAccount){ //SA-669: Update caseId to consumer suport case

          caseId = accountIdCSCaseMap.get(t.AccountId);

        }

        if (t.WhoId != null && !String.ValueOf(t.WhoId).startsWith('00Q') && t.whatId == null){

          t.WhatId = caseId;

        }else if (accountIdCSCaseMap.values().contains(caseId) && t?.Account?.IsPersonAccount){ //Added under SA-669

          t.WhoId = t?.Account?.PersonContactId;

          t.WhatId = caseId;

        }

        

        if (!masterCallIdCaseMap.get(callIdToMasterIdMap.get(callId)).Owner.Type == 'User' && !accountIdCSCaseMap.values().contains(caseId)){

          if (case2QueryMap.containsKey(caseId) && case2QueryMap.get(caseId).Owner.Type != 'User') {

            casesToUpdate.put(caseId, new Case(Id = caseId, OwnerId = t.ownerId));

          }

        }

      }else if (phoneCaseMap.containsKey(t.Dialpad_Caller_Phone__c)){

        ID caseId = phoneCaseMap.get(t.Dialpad_Caller_Phone__c);

        if (t.WhoId != null && !String.ValueOf(t.WhoId).startsWith('00Q') && t.whatId == null){

          t.WhatId = caseId;



        }else if (phoneCSCases.contains(caseId)){ //Added under SA-669 // Updated under CSS-159

          t.WhatId = caseId;

        }

        

        //added case2QueryMap check for DSS-408

        if (!masterCallIdCaseMap.get(callIdToMasterIdMap.get(callId)).Owner.Type == 'User' && !phoneCSCases.contains(caseId) && case2QueryMap.containsKey(caseId)){

          if (case2QueryMap.get(caseId).Owner.Type != 'User') {

            casesToUpdate.put(caseId,new Case(Id = caseId, OwnerId = t.ownerId ));

          }

        }

      }



      if (t.AccountId != null && t.whatId != null && String.valueOf(t.whatId).startsWith('500')){

        caseToCorrectAccountId.put(t.whatId, t.AccountId);

      }

    }

    

    for (Case c : [SELECT Id

            FROM Case

            WHERE Id IN :caseToCorrectAccountId.keySet()

            AND IsClosed = false

            AND AccountId = null

            AND RecordTypeID != : consumerSupportCaseRecordTypeId])

    {       

      if (casesToUpdate.containsKey(c.Id)){

        casesToUpdate.get(c.Id).accountId = caseToCorrectAccountId.get(c.Id);

      }else{

        c.accountId = caseToCorrectAccountId.get(c.Id);

        casesToUpdate.put(c.Id, c);

      }

    }



    update casesToUpdate.values();

    update leadsToUpdate.values();

    update processTaskMap.values();

} 