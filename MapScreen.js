import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import { app } from './firebaseConfig';
import { getDatabase, ref, push } from "firebase/database";


export default function MapScreen({ route }) {
    const [savedb, setSavedb] = useState(false);



    const database = getDatabase(app);

    const { keyword, seached } = route.params;

    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    })




    useEffect(() => {
        handleAddress()
    }, []);

    const handleSave = () => {
        push(ref(database, 'locations/'), keyword);
        setSavedb(true);
    }

    const apikey = "66ed31c1c9fd4490011665mzge94039";

    const handleAddress = () => {
        fetch(`https://geocode.maps.co/search?q=${keyword}&api_key=${apikey}`)
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch:" + response.statusText);

                return response.json()
            })

            .then(data => setRegion({
                ...region,
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lon),
            }))

            .catch(err => console.error(err));

    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapview}
                region={region}

            >
                <Marker
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude
                    }}

                />
            </MapView>

            <Button disabled={seached || savedb} mode='contained' onPress={handleSave}>SAVE LOCATION</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, mapview: {
        width: '100%',
        height: '95%'
    }
});