import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./CommonStyleSheet"
import MyImage from '../assets/bgimages/login.png';
//login validation to add 

export default function Login({ navigation }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setisError] = useState(false);
  const credentialsKey = "userCredentials"; // User credentials key in AsyncStorage
  const storageExpirationTime = 15; // Expiration time in minutes 

  // This will check for non expired credentials
  useEffect(() => {
    const getCredentials = async () => {
      try {
        const value = await AsyncStorage.getItem(credentialsKey);
        if (value !== null) {
          //setInputValue(value);
          let curData = JSON.parse(value);

          const currentTimestamp = Math.floor(Date.now() / 1000); // get current UNIX timestamp. Divide by 1000 to get seconds and round it down
          // Remove the saved data if it expires.
          // Check if expiryTime exists with the optional chaining operator `?`
          // then, we check if the current ‘now’ time is still behind expiryTime
          // if not, it means the storage data has expired and needs to be removed
          if (currentTimestamp >= curData?.expiryTime) {
            AsyncStorage.removeItem(credentialsKey);
            //return; // if needed, you can leave the function here depending of your function’s logic
            setPassword('');
            setisError(true);
          }
          else {
            setUserName(curData.userId);
            setPassword(curData.pass);
            setisError(false);
          }
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
        Alert.alert('Error', 'Failed to retrieve input.');
      }
    };

    getCredentials();
  }, []);

  //
  const handleLogin = async () => {
    try {
      //
      if (userName === 'Admin' && password === '12345') {
        //setPassword('');
        setisError(false);

        // Save credentials and set an expiration date
        const now = new Date();
        now.setMinutes(now.getMinutes() + storageExpirationTime); // add the expiration time to the current Date time
        const expiryTimeInTimestamp = Math.floor(now.getTime() / 1000); // convert the expiry time in UNIX timestamp

        const data = {
          userId: userName, // example of data you need to store
          pass: password,
          expiryTime: expiryTimeInTimestamp
        };
        //console.log(data);
        // Store the data with expiration time in AsyncStorage
        await AsyncStorage.setItem(credentialsKey, JSON.stringify(data));

        navigation.navigate('Dashboard');
      } else {
        // Display error message or notification for invalid credentials
        setisError(true);
        console.log('Invalid credentials');
      }
    } catch (err) {
      console.log("error")
    }

  };

  return (
    <ImageBackground source={MyImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: '#0b756e' }]}>Welcome to LoveStorying!</Text>
        <View style={{ height: 30 }} />
        <TextInput
          style={styles.loginInput}
          placeholder="Username"
          onChangeText={setUserName}
          keyboardType="default"
          value={userName}
        />
        <TextInput
          style={styles.loginInput}
          placeholder="Password"
          onChangeText={setPassword}
          keyboardType="default"
          value={password}
          secureTextEntry
        />
        <View style={{ height: 20 }} />
        <Button
          title="Login"
          color='#0b756e'
          onPress={handleLogin}
        />
        <View style={{ height: 20 }} />
        {isError && (
          <Text style={{ fontSize: 18 }}>Invalid Credentals. Please try again.</Text>
        )}
      </View>
    </ImageBackground>
  );
}
