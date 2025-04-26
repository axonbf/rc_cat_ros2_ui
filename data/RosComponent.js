import { useEffect, useState } from 'react';
const ROSLIB = require('roslib');

function RosComponent() {
    const [ros, setRos] = useState(null);
    const [connected, setConnected] = useState(false);
    const [pointCloudData, setPointCloudData] = useState(null);
    const [gpsPosition, onPositionUpdate] = useState(null);
    const [batteryStatus, onBatteryStatus] = useState(null);

    useEffect(() => {
        const rosInstance = new ROSLIB.Ros({
            url: 'ws://localhost:9090'
        });

        rosInstance.on('connection', () => {
            console.log('Connected to rosbridge WebSocket!');
            setConnected(true);
        });

        rosInstance.on('error', (error) => {
            console.log('Error connecting to rosbridge WebSocket: ', error);
        });

        rosInstance.on('close', () => {
            console.log('Connection to rosbridge WebSocket closed!');
            setConnected(false);
        });

        if (connected) {

            const gpsListener = new ROSLIB.Topic({
                ros: rosInstance,
                name: "/mavros/global_position/raw/fix",
                messageType: "sensor_msgs/NavSatFix",
            })

            gpsListener.subscribe(function (message) {
                onPositionUpdate(message)
            });

            const batteryListener = new ROSLIB.Topic({
                ros: rosInstance,
                name: "/mavros/battery",
                messageType: "sensor_msgs/BatteryState",
            })

            batteryListener.subscribe(function (message) {
                onBatteryStatus(message)
            });

            const pointCloudTopic = new ROSLIB.Topic({
                ros: rosInstance,
                name: '/points_raw',
                messageType: 'sensor_msgs/PointCloud2'
            });

            pointCloudTopic.subscribe(function (message) {
                setPointCloudData(message);
            });

            // Cleanup
            return () => {
                pointCloudTopic.unsubscribe();
                gpsListener.unsubscribe();
                batteryListener.unsubscribe();
            };
        }

        setRos(rosInstance);
    }, [connected]);


    return { connected, pointCloudData, gpsPosition, batteryStatus };
}

export default RosComponent;
