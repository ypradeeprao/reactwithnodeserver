/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { alltypecompconsolelog } from "./logic";
const { useState, useEffect, createRef } = React;

export function Webrtccomp() {
    const audioMediaConstraints = {
        audio: true,
        video: false,
    };

    const videoMediaConstraints = {
        // or you can set audio to false
        // to record only video
        audio: true,
        video: true,
    };

    const screensharevideoelementref = createRef(null);
    const videoelementref = createRef(null);
    const audioelementref = createRef(null);
    let screensharemediaRecorder;
    let videomediaRecorder;
    let audiomediaRecorder;
    let screensharerecordedBlobs = [];
    let videorecordedBlobs = [];
    let audiorecordedBlobs = [];

    const audioonlyconstraints = (window.constraints = {
        audio: true,
        video: false,
    });
    const videoonlyconstraints = (window.constraints = {
        audio: false,
        video: true,
    });
    const audiovideoconstraints = (window.constraints = {
        audio: true,
        video: true,
    });

    let openscreenshareclickhanlder = async (methodprops) => {
        try {
            let stream = await navigator.mediaDevices.getDisplayMedia(
                audiovideoconstraints
            );
            screensharevideoelementref.current.srcObject = stream;
            Window.screensharestream = stream;
            screensharevideoelementref.current.onloadedmetadata = function (e) {
                // screensharevideoelementref.current.play();
            };
        } catch (e) {
            alltypecompconsolelog("Unable to acquire screen capture: " + e);
        }
    };

    let startrecordscreenshareclickhanlder = async (methodprops) => {
        try {
            screensharemediaRecorder = new MediaRecorder(Window.screensharestream);
            screensharemediaRecorder.onstop = (event) => {
                alltypecompconsolelog("Recorder stopped: ", event);
            };
            screensharemediaRecorder.ondataavailable = screensharehandleDataAvailable;
            screensharemediaRecorder.start();
        } catch (e) {
            console.error("Exception while creating MediaRecorder:", e);
            return;
        }
    };

    function screensharehandleDataAvailable(event) {
        alltypecompconsolelog("handleDataAvailable", event);
        if (event.data && event.data.size > 0) {
            screensharerecordedBlobs.push(event.data);
        }
    }

    let stoprecordscreenshareclickhanlder = async (methodprops) => {
        try {
            screensharemediaRecorder.stop();
        } catch (e) {
            alltypecompconsolelog("Unable to acquire screen capture: " + e);
        }
    };

    let downloadrecordscreenshareclickhanlder = async (methodprops) => {
        try {
            const blob = new Blob(screensharerecordedBlobs, { type: "video/mp4" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "screenshare.mp4";
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);
        } catch (e) {
            alltypecompconsolelog("Unable to acquire screen capture: " + e);
        }
    };

    async function openaudioclickhanlder(e) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(
                audioonlyconstraints
            );
            Window.audiostream = stream;
            // const videoTracks = stream.getVideoTracks();

            //   alltypecompconsolelog(`Using video device: ${videoTracks[0].label}`);
            //  Window.stream = stream; // make variable available to browser console
            audioelementref.current.srcObject = stream;
            audioelementref.current.onloadedmetadata = function (e) {
                audioelementref.current.play();
            };
        } catch (error) {
            if (error.name === "OverconstrainedError") {
                const v = window.constraints.video;
                alltypecompconsolelog(
                    `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
                );
            } else if (error.name === "NotAllowedError") {
                alltypecompconsolelog(
                    "Permissions have not been granted to use your camera and " +
                    "microphone, you need to allow the page access to your devices in " +
                    "order for the demo to work."
                );
            }
            alltypecompconsolelog(`getUserMedia error: ${error.name}`, error);
        }
    }

    let startrecordaudioclickhanlder = async (methodprops) => {
        try {
            audiomediaRecorder = new MediaRecorder(Window.audiostream);
            audiomediaRecorder.onstop = (event) => {
                alltypecompconsolelog("Recorder stopped: ", event);
            };
            audiomediaRecorder.ondataavailable = audiohandleDataAvailable;
            audiomediaRecorder.start();
        } catch (e) {
            console.error("Exception while creating MediaRecorder:", e);
            return;
        }
    };

    function audiohandleDataAvailable(event) {
        alltypecompconsolelog("handleDataAvailable", event);
        if (event.data && event.data.size > 0) {
            audiorecordedBlobs.push(event.data);
        }
    }

    let stoprecordaudioclickhanlder = async (methodprops) => {
        try {
            audiomediaRecorder.stop();
        } catch (e) {
            alltypecompconsolelog("Unable to acquire screen capture: " + e);
        }
    };

    let downloadrecordaudioclickhanlder = async (methodprops) => {
        try {
            const blob = new Blob(audiorecordedBlobs, { type: "video/mp4" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "audio.mp4";
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);
        } catch (e) {
            alltypecompconsolelog("Unable to acquire screen capture: " + e);
        }
    };

    async function openvideoclickhanlder(e) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(
                audiovideoconstraints
            );

            const videoTracks = stream.getVideoTracks();

            alltypecompconsolelog(`Using video device: ${videoTracks[0].label}`);
            Window.videostream = stream;
            //  Window.stream = stream; // make variable available to browser console
            videoelementref.current.srcObject = stream;
            videoelementref.current.onloadedmetadata = function (e) {
                // videoelementref.current.play();
            };
        } catch (error) {
            if (error.name === "OverconstrainedError") {
                const v = window.constraints.video;
                alltypecompconsolelog(
                    `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
                );
            } else if (error.name === "NotAllowedError") {
                alltypecompconsolelog(
                    "Permissions have not been granted to use your camera and " +
                    "microphone, you need to allow the page access to your devices in " +
                    "order for the demo to work."
                );
            }
            alltypecompconsolelog(`getUserMedia error: ${error.name}`, error);
        }
    }

    let startrecordvideoclickhanlder = async (methodprops) => {
        try {
            videomediaRecorder = new MediaRecorder(Window.videostream);
            videomediaRecorder.onstop = (event) => {
                alltypecompconsolelog("Recorder stopped: ", event);
            };
            videomediaRecorder.ondataavailable = videohandleDataAvailable;
            videomediaRecorder.start();
        } catch (e) {
            console.error("Exception while creating MediaRecorder:", e);
            return;
        }
    };

    function videohandleDataAvailable(event) {
        alltypecompconsolelog("handleDataAvailable", event);
        if (event.data && event.data.size > 0) {
            videorecordedBlobs.push(event.data);
        }
    }

    let stoprecordvideoclickhanlder = async (methodprops) => {
        try {
            videomediaRecorder.stop();
        } catch (e) {
            alltypecompconsolelog("Unable to acquire screen capture: " + e);
        }
    };

    let downloadrecordvideoclickhanlder = async (methodprops) => {
        try {
            const blob = new Blob(videorecordedBlobs, { type: "video/mp4" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "video.mp4";
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);
        } catch (e) {
            alltypecompconsolelog("Unable to acquire screen capture: " + e);
        }
    };

    return (
        <>
            <div onClick={openscreenshareclickhanlder}>open screenshare</div>
            <div onClick={startrecordscreenshareclickhanlder}>
                start record screenshare
            </div>
            <div onClick={stoprecordscreenshareclickhanlder}>
                stop record screenshare
            </div>
            <div onClick={downloadrecordscreenshareclickhanlder}>
                download screenshare
            </div>

            <div onClick={openaudioclickhanlder}>start audio</div>
            <div onClick={startrecordaudioclickhanlder}>start record audio</div>
            <div onClick={stoprecordaudioclickhanlder}>stop record audio</div>
            <div onClick={downloadrecordaudioclickhanlder}>download audio</div>

            <div onClick={openvideoclickhanlder}>start video</div>
            <div onClick={startrecordvideoclickhanlder}>start record video</div>
            <div onClick={stoprecordvideoclickhanlder}>stop record video</div>
            <div onClick={downloadrecordvideoclickhanlder}>download video</div>

            <button id="showVideo">Open camera</button>
            <video
                ref={screensharevideoelementref}
                playsinline
                width="400"
                height="400"
                controls
            ></video>
            <video
                ref={videoelementref}
                playsinline
                width="400"
                height="400"
                controls
            ></video>
            <audio ref={audioelementref} controls style={{ height: "100px" }} />

            <canvas id="drawing-board" width="400px" height="400px"></canvas>

            <canvas
                id="myCanvas"
                width="200"
                height="100"
                style={{ border: "1px solid #000000" }}
            >
                Your browser does not support the HTML canvas tag.
            </canvas>
        </>
    );
}