import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as OpenAIServices from '../components/OpenAIServices';
//import MyImage from '../assets/bgimages/viewstory.jpg';
import styles from "./CommonStyleSheet"

export default function ViewStory({ navigation, route }) {

    // TODO: In this section, when the user selects save story, the user will be redirected to dashboard? 
    // and the story storyData variable will be set back as default (remove stored data in the)

    return (
        <View>
            <Text>This is where the story will be displayed</Text>
        </View>

    );

}