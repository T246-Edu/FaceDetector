import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);

  const faceDetected = ({ faces }) => {
    setFaces(faces); // instead of setFaces({faces})
    console.log({ faces });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission !== true) {
    return <Text>No access to camera</Text>;
  }

  return (
    //<View style={{ flex: 1 }}>
    <Camera
      style={{ flex: 1 }}
      type="front"
      onFacesDetected={faceDetected}
      FaceDetectorSettings={{
        minDetectionInterval: 5000,
        tracking: false,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
        }}
      >
        {faces[0] && (
          <Text style={{ top: "100%", marginLeft: "20%",color:"red" }}>
            Detected Face, The Face is at: {faces[0].rollAngle}{" "}
          </Text>
        )}
      </View>
    </Camera>
  );
}
