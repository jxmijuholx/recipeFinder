import { useState } from 'react';
import { Alert, Button, FlatList, Image, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [hakusana, setHakusana] = useState('')
  const [meals, setMeals] = useState([])

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${hakusana}`)
    .then(response => response.json())
    .then(responseJson => setMeals(responseJson.meals))
    .catch(error =>{
      Alert.alert('Error', error)
    })
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <FlatList
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
        <View>
          <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
          <Image 
            style={{width: 50, height: 50}} 
            source={{uri: item.strMealThumb}} 
          />
        </View>}
        data={meals}
        ItemSeparatorComponent={listSeparator} 
      />
      <TextInput 
          style={{fontSize: 18, width: 200}} 
          placeholder='Search' 
          value={hakusana}
          onChangeText={text => setHakusana(text)} 
        />
        <Button title="Find" onPress={getRecipes} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});