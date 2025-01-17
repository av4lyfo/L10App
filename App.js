import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

let originalData = [];

const App = () => {
    const [myData, setMyData] = useState([]);

    // Fetch the currency exchange rates dataset
    useEffect(() => {
        fetch("https://mysafeinfo.com/api/data?list=curexchangerates&format=json&case=default")
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                if (originalData.length < 1) {
                    setMyData(myJson);
                    originalData = myJson;
                }
            })
    }, []);

    // Filter the dataset based on user input
    const filterData = (text) => {
        if (text !== '') {
            let myFilteredData = originalData.filter((item) =>
                item.CurrencyCodes.toLowerCase().includes(text.toLowerCase())
            );
            setMyData(myFilteredData);
        } else {
            setMyData(originalData);
        }
    };


    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Text style={styles.title}>{item.CurrencyCodes}</Text>
                <Text style={styles.subtitle}>Rate: {item.Rate}</Text>
                <Text style={styles.description}>{item.Description}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.header}>Currency Exchange Rates</Text>
            <TextInput
                style={styles.searchBox}
                placeholder="Search by Currency Code"
                onChangeText={(text) => filterData(text)}
            />
            <FlatList
                data={myData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#0f3a61",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
        color: "#ffffff"
    },
    searchBox: {
        height: 40,
        borderColor: "#3be643",
        borderWidth: 3,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "#dfeaf1",
        marginBottom: 16,
    },
    card: {
        padding: 16,
        backgroundColor: "#e2edf4",
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 14,
        color: "#555",
    },
    description: {
        fontSize: 12,
        color: "#777",
    },
});

export default App;
