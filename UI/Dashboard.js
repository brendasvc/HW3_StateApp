import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

import styles from "./CommonStyleSheet";
import MyImage from '../assets/bgimages/Picture1.png';

export default function Dashboard({ navigation }) {
    return (
        <ImageBackground source={MyImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={{ height: 20 }} />
                <TouchableOpacity style={styles.buttonStyle1} >
                    <Button
                        color='#2f8062'
                        title="Go to Create Story Page"
                        onPress={() => navigation.navigate('CreateStory')}
                    />
                </TouchableOpacity>
                <View style={{ height: 20 }} />

                <Button
                    color='#2b3b32'
                    title="Logout"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </ImageBackground>
    );

}