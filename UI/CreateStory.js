import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';

import React, { useState, useEffect, useCallback } from 'react';

import styles from "./CommonStyleSheet";
import MyImage from '../assets/bgimages/forest.jpg';
// NEW
import AsyncStorage from '@react-native-async-storage/async-storage';

//To do
//move generated story text and image to view story page
// add more filters- age etc.
// Add the option to the user to give a name to the story

export default function CreateStory({ navigation }) {
    const [inputText, setInputText] = useState('');
    const [curStoryData, setCurStoryData] = useState();
    const [generatedTitle, setGeneratedTitle] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [genre, setGenre] = useState('fiction');
    const [age, setAge] = useState('6');
    const [paragraphs, setParagraphs] = useState('2');
    const [sentences, setSentences] = useState('4');
    const [words, setWords] = useState('20');
    const [imageType, setImageType] = useState('illustration');
    const [firstLaunch, setLaunch] = useState(true);

    const dataKey = "selectedData"

    const storyData = {
        storyGenre: genre,
        childAge: age,
        paragraphsInText: paragraphs,
        sentencesInParagraph: sentences,
        wordsInSentence: words,
        imageTypeInStory: imageType,
        inputTextInStory: inputText
    }
    // UseEffect hook to set default input text based on selected genre
    useEffect(() => {
        if (!firstLaunch) {
            console.log("1")

            if (genre === 'fiction') {
                setInputText("a cat and a mouse were best friends...");
            } else if (genre === 'poem') {
                setInputText("a poem about Seattle");
            }
            else if (genre === 'fantasy') {
                setInputText("as the rest of the world sleeps, a fairy visits a girl named Sarah");
            }
            else if (genre === 'adventure') {
                setInputText("a boy named John climbs the top of the hill only to find...");
            }
            else if (genre === 'moral') {
                setInputText("Pinocchio's nose grew longer and longer as he...");
            }
        }
    }, [genre]);

    // Load saved data on launch
    useEffect(() => {
        console.log("2")
        loadSavedData();
    }, []);

    // Update on storyData and inputText change
    useEffect(() => {
        console.log("3")
        storyData.inputTextInStory = inputText;
        updateData();
    }, [storyData || inputText]);

    // Loads saved data on launch
    const loadSavedData = async () => {
        try {
            let getData = await AsyncStorage.getItem(dataKey);
            if (getData !== null) {
                let myData = JSON.parse(getData);

                storyData.storyGenre = myData.storyGenre;
                //storyData.childAge = myData.childAge;
                //console.log("AGE", myData.childAge)
                storyData.paragraphsInText = myData.paragraphsInText;
                storyData.sentencesInParagraph = myData.sentencesInParagraph;
                storyData.wordsInSentence = myData.wordsInSentence;
                storyData.imageTypeInStory = myData.imageTypeInStory;
                storyData.inputTextInStory = myData.inputTextInStory;

                setGenre(storyData.storyGenre);
                //setAge(storyData.childAge);
                setParagraphs(storyData.paragraphsInText);
                setSentences(storyData.sentencesInParagraph);
                setWords(storyData.wordsInSentence);
                setImageType(storyData.imageTypeInStory);
                setInputText(storyData.inputTextInStory);

                setLaunch(false);   // This is used to avoid first useEffect to write over saved input
            }

        } catch (error) {
            console.error('Error loading saved data:', error);
            Alert.alert('Error', 'Failed to load data.');
        }
    }


    // Updates data on change of storyData
    const updateData = async () => {
        try {
            await AsyncStorage.setItem(dataKey, JSON.stringify(storyData));
        } catch (error) {
            console.error('Error saving data:', error);
            Alert.alert('Error', 'Failed to save input.');
        }
    }

    // Handles genre selection
    const handleGenreSelect = async (selectedGenre) => {
        try {
            if (selectedGenre !== genre) {
                setGenre(selectedGenre);
                storyData.storyGenre = selectedGenre;
            }
        } catch (error) {
            console.error('Error saving data:', error);
            Alert.alert('Error', 'Failed to save input.');
        }
    };

    // Handles image type selection
    const handleImageSelect = async (selectedImageType) => {
        try {
            if (selectedImageType !== imageType) {
                setImageType(selectedImageType);
                storyData.imageTypeInStory = selectedImageType;
            }
        } catch (error) {
            console.error('Error saving data:', error);
            Alert.alert('Error', 'Failed to save input.');
        }
    };

    // Handles child age selection
    const handleChangeAge = (text) => {
        const ageValue = Number(text);
        setAge(ageValue);
        if (!isNaN(ageValue)) {
            if (ageValue >= 3 && ageValue <= 5) {
                setParagraphs('2');
                setSentences('4');
                setWords('20');
            } else if (ageValue > 5 && ageValue <= 8) {
                setParagraphs('2');
                setSentences('4');
                setWords('20');
            }
            else if (ageValue > 8 && ageValue <= 12) {
                setParagraphs('2');
                setSentences('4');
                setWords('20');
            }
            // Update storyData with new user input
            if (ageValue >= 3 && ageValue <= 12) {
                storyData.childAge = String(ageValue);
                storyData.paragraphsInText = paragraphs;
                storyData.sentencesInParagraph = sentences;
                storyData.wordsInSentence = words;
            }
        }
    };

    // Handles story creation, navigates to ViewStory page on press
    const generateStory = async () => {
        try {
            //navigation.navigate('ViewStory', { theStoryTitle: storyTitle, theStoryData: storyData, sGenre: genre, uAge: age, questionsResponse: questions});
            navigation.navigate('ViewStory', { theStoryData: storyData, sGenre: genre, uAge: age });
        } catch (error) {
            console.log("ERROR!");
            setErrorMessage('Error generating story.' + error.message);
        }
    }
    /*
        // Dismiss keyboard
        const DismissKeyboard = ({ children }) => (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                {children}
            </TouchableWithoutFeedback>
        );*/

    return (
        <ImageBackground source={MyImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.inputLabel}>Select Genre:</Text>
                    <View style={styles.storyParameterSelector}>
                        <Button
                            title="Fiction"
                            onPress={() => handleGenreSelect('fiction')}
                            disabled={genre === 'fiction'}
                            color='#8a3636'
                        />
                        <Button
                            title="Adventure"
                            onPress={() => handleGenreSelect('adventure')}
                            disabled={genre === 'adventure'}
                            color='#8a3636'
                        />
                        <Button
                            title="Moral Story"
                            onPress={() => handleGenreSelect('moral')}
                            disabled={genre === 'moral'}
                            color='#8a3636'
                        />
                        <Button
                            title="Fantasy"
                            onPress={() => handleGenreSelect('fantasy')}
                            disabled={genre === 'fantasy'}
                            color='#8a3636'
                        />
                        <Button
                            title="Poem"
                            onPress={() => handleGenreSelect('poem')}
                            disabled={genre === 'poem'}
                            color='#8a3636'
                        />
                    </View>
                    <View style={{ height: 20 }} />
                    <Text style={styles.inputLabel}>Select Image Type:</Text>
                    <View style={styles.storyParameterSelector}>
                        <Button
                            title="Illustration"
                            onPress={() => handleImageSelect('illustration')}
                            disabled={imageType === 'illustration'}
                            color='#8a4736'
                        />
                        <Button
                            title="Historical"
                            onPress={() => handleImageSelect('historical image')}
                            disabled={imageType === 'historical image'}
                            color='#8a4736'
                        />
                        <Button
                            title="Photorealistic"
                            onPress={() => handleImageSelect('picture')}
                            disabled={imageType === 'picture'}
                            color='#8a4736'
                        />
                    </View>
                    <View style={{ height: 30 }} />

                    <View style={styles.storyParameterSelector}>
                        <Text style={styles.inputLabel}>Enter the Child's Age:</Text>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={[styles.inputNumber, { marginLeft: 50 }]}
                                    onChangeText={handleChangeAge}
                                    keyboardType="numeric"
                                    value={age}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ height: 20 }} />
                    <View style={styles.storyParameterSelector}>
                        <Text style={styles.inputLabel}>Total Paragraphs:</Text>
                        <TextInput
                            style={[styles.inputNumber, { marginLeft: 80 }]}
                            onChangeText={setParagraphs}
                            keyboardType="numeric"
                            value={paragraphs}
                        />
                    </View>
                    <View style={styles.storyParameterSelector}>
                        <Text style={styles.inputLabel}>Sentences per Paragraph:</Text>
                        <TextInput
                            style={[styles.inputNumber, { marginLeft: 5 }]}
                            onChangeText={setSentences}
                            keyboardType="numeric"
                            value={sentences}
                        />
                    </View>
                    <View style={styles.storyParameterSelector}>
                        <Text style={styles.inputLabel}>Words per Sentence:</Text>
                        <TextInput
                            style={[styles.inputNumber, { marginLeft: 50 }]}
                            onChangeText={setWords}
                            keyboardType="numeric"
                            value={words}
                        />
                    </View>

                    <View style={{ height: 20 }} />
                    <Text style={styles.inputLabel}>Enter your story prompt:</Text>
                    <TextInput
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                        style={styles.inputText}
                        placeholder="Type here..."
                    />
                    <View style={{ height: 20 }} />
                    <Button title="Generate Illustrated Story" onPress={generateStory} color='#bf150f' />
                </View>
            </View>
        </ImageBackground>
    );
};
