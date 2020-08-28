import React from 'react';
import { Text, View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { globalStyle, globalTextStyle, } from '../styles/global';
import { getColorFromLevel, getColorFromScore } from '../functions/product';


export default function DetailsScreen ({route}){

    let product = route.params.product;
    const screenWidth = Math.round(Dimensions.get('window').width);
    console.log(route.params.product.image_url);

    return (
        <ScrollView contentContainerStyle={styles.productInfoContainer} style={{flex: 1}}>
            <Image
                source={{uri: product.image_url }}
                style={{ alignSelf: 'center', width: screenWidth, height: 200, resizeMode: 'contain', marginBottom: 20}}
            />

            <Text style={globalTextStyle.h1}>{product.product_name}</Text>
            <Text style={globalTextStyle.subtitle}>{product.brands.toUpperCase()}</Text>

            <View style={styles.separator}/>

            <Text style={globalTextStyle.h2}>Calories pour 100g: </Text>
            <Text style={globalTextStyle.content}>{product.energy_100g} kJ</Text>

            <View style={styles.separator}/>

            <Text style={[globalTextStyle.h2,
                {color: getColorFromScore(product.nutrition_grades)}]}>
                Nutriscore: {product.nutrition_grades}
            </Text>

            <View style={styles.separator}/>

            <Text style={globalTextStyle.h2}>Nutriments</Text>
            <View style={styles.nutrimentsContainer}>
                <Text style={[globalTextStyle.content,
                    {color: getColorFromLevel(product.nutrient_levels.fat)}]}>
                    Graisse {'\n'}
                    {product.nutrient_levels.fat}
                </Text>

                <Text style={[globalTextStyle.content,
                    {color: getColorFromLevel(product.nutrient_levels.salt)}]}>
                    Sel {'\n'}
                    {product.nutrient_levels.salt}
                </Text>

                <Text style={[globalTextStyle.content,
                    {color: getColorFromLevel(product.nutrient_levels['saturated-fat'])}]}>
                    Gras saturé{'\n'}
                    {product.nutrient_levels['saturated-fat']}
                </Text>

                <Text style={[globalTextStyle.content,
                    {color: getColorFromLevel(product.nutrient_levels.sugars)}]}>
                    Sucre {'\n'}
                    {product.nutrient_levels.sugars}
                </Text>
            </View>

            <View style={styles.separator}/>

            <Text style={globalTextStyle.h2}>Ingredients</Text>
            <Text style={globalTextStyle.content}>{product.ingredients_text_fr} </Text>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    nutrimentsContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    productInfoContainer : {
        flex: 1,
        paddingLeft: 40,
        paddingRight: 40
    },
    separator: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 1,
    }
})
