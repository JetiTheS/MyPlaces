import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { getDatabase, push, ref, onValue, remove, child } from 'firebase/database';
import { app } from './firebaseConfig';


export default function PlaceFinder({ navigation }) {

    const [address, setAddress] = useState("");
    const [saved, setSaved] = useState([]);
    const database = getDatabase(app);

    useEffect(() => {
        const itemsRef = ref(database, 'locations/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setSaved(Object.entries(data));
            } else {
                setSaved([]); // Handle the case when there are no items
            }
        })
    }, []);

    const confirmation = (id) => {
        Alert.alert("Do you what to remove the address?", "The address will be deleted permanently", [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => deleteItem(id) },
        ]);
    }

    const deleteItem = (id) => {

        remove(child(ref(database), 'locations/' + id))

    }


    return (
        <View style={styles.container}>
            <TextInput style={styles.input} onChangeText={text => setAddress(text)} placeholder='Type in address'></TextInput>
            <Button
                mode='contained'
                onPress={() => navigation.navigate('MapScreen', { keyword: address })}
            >SHOW ON MAP</Button>
            <FlatList
                style={styles.list}
                data={saved}
                renderItem={({ item }) =>
                    <Card onLongPress={() => confirmation(item[0])} style={styles.card}>

                        <Card.Content style={styles.listitem}>
                            <Text variant="bodyMedium">  {item[1]}</Text>
                            <Text
                                variant="bodySmall"
                                style={styles.show}
                                onPress={() => navigation.navigate('MapScreen', { keyword: item[1], seached: true })} >Show on map</Text>
                        </Card.Content>
                        <Card.Actions>

                        </Card.Actions>
                    </Card>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "flex-start",
    },
    input: {
        width: "90%",
        marginBottom: 10,
        marginTop: 10
    },
    listcontainer: {
        marginTop: 5
    },
    listitem: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"


    },
    list: {
        width: "100%",
        marginTop: 10

    },
    card: {
        marginBottom: 10,

    },
    cardtitle: {

    },
    show: {



    }
});