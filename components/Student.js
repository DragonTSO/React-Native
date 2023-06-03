import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Student from '../components/Student';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [students, setStudents] = useState([]);
    const [authInfo, setAuthInfo] = useState();

    useEffect(() => {
        retrieveData();
        getListStudent();
    }, []);

    // Funtion lấy data login từ AsyncStorage
    const retrieveData = async () => {
        try {
            const authInfo = await AsyncStorage.getItem('authInfo');
            if (authInfo !== null) {
                console.log('====> authInfo from AsyncStorage', authInfo);
                setAuthInfo(JSON.parse(authInfo));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const doLogout = () => {
        AsyncStorage.removeItem('authInfo');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    };

    // Hàm điều hướng
    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    const getListStudent = async () => {
        try {
            const API_URL = 'http://10.24.49.134:3000/students';
            const response = await fetch(API_URL);
            const data = await response.json();
            console.log('====> students:', JSON.stringify(data));
            setStudents(data);
        } catch (error) {
            console.log(('Fetch data failed ' + error));
            return null;
        }
    };

   // Funtion render danh sách sinh viên
   const renderStudents = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
                <Button title='Go to Login Screen' onPress={navigateToLogin} />
                <View>
                    <Text style={styles.txtHeader}>List Student</Text>
                </View>
                <View style={styles.studentContainer}>
                    {students.map((item, index) => {
                        return (
                            <View style={styles.item} key={index}>
                                <View style={styles.itemImageContainer}>
                                    {item.gender === 'Male' ? (
                                        <Image style={styles.itemImage} source={require('../assets/male.png')} resizeMode='contain' />
                                    ) : (
                                        <Image style={styles.itemImage} source={require('../assets/female.png')} resizeMode='contain' />
                                    )}
                                </View>
                                <View style={{ paddingLeft: 15 }}>
                                    <Text>{item.studentId}</Text>
                                    <Text>{item.fullName}</Text>
                                    <Text>{item.gender}</Text>
                                    <Text>{item.email}</Text>
                                    <Text>{item.dateOfBirth}</Text>
                                </View>
                            </View>
                        );
                        return <Student student={item} key={index}></Student>;
                    })}
                </View>
            </ScrollView>
            );
        };
    
        // Gọi vào hàm return với dữ liệu ban đầu là là danh sách sinh viên rỗng
        return (
            <SafeAreaView style={styles.container}>
                {authInfo ? <Button title='Logout' onPress={doLogout} /> : <Button title='Go to Login Screen' onPress={navigateToLogin} />}
                {authInfo?.role === 'ADMIN' ? renderStudents() : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flexGrow: 1,
        padding: 20
    },
    studentContainer: {
        flex: 1
    },
    txtHeader: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    item: {
        paddingVertical: 15,
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 0.5,
        flexDirection: 'row'
    },
    itemImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    itemImage: {
        flex: 1,
        width: undefined,
        height: undefined
    }
});

export default HomeScreen;