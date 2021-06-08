/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Picker,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

const datajson = require('./data.json');

interface Colour {
  name: string;
  hex: string;
}

interface Product {
  name: string;
  price: number;
  redecorationCycle: number;
}

interface ProjectType_sector {
  type: string;
  sector: string;
}

interface ProjectTypes {
  name: string;
}

interface Sector_product {
  sector: string;
  product: string;
}

interface Sector {
  name: string;
  costMultiplier: number;
}

const App = () => {
  const [selectedSectorTypeItem, setSelectedSectorTypeItem] =
    useState<Sector>();
  const [selectedProductTypeItem, setSelectedProductTypeItem] =
    useState<Product>();
  const [selectedColorTypeItem, setSelectedColorTypeItem] = useState<Colour>();

  const [selectedProjectTypeValue, setSelectedProjectTypeValue] =
    useState<string>();
  const [selectedSectorTypeValue, setSelectedSectorTypeValue] =
    useState<string>();
  const [selectedProductTypeValue, setSelectedProductTypeValue] =
    useState<string>();
  const [selectedColorTypeValue, setSelectedColorTypeValue] =
    useState<string>();

  const [data] = useState(datajson);

  const backgroundStyle = {
    flex: 1,
  };

  const handleProjectTypeValue = (value: string) => {
    setSelectedProjectTypeValue(value);
  };

  const handleSectorTypeValue = (value: string) => {
    let item = data.sectors.find((sectorItem: Sector) => {
      if (sectorItem.name === value) {
        return sectorItem;
      }
    });
    setSelectedSectorTypeItem(item);
    setSelectedSectorTypeValue(value);
  };

  const handleProductTypeValue = (value: string) => {
    let item = data.products.find((prodocutItem: Product) => {
      if (prodocutItem.name === value) {
        return prodocutItem;
      }
    });
    setSelectedProductTypeItem(item);
    setSelectedProductTypeValue(value);
  };

  const handleColorTypeValue = (value: string) => {
    let item: Colour = data.colour.find((colorItem: Colour) => {
      if (colorItem.name === value) {
        return colorItem;
      }
    });

    setSelectedColorTypeItem(item);
    setSelectedColorTypeValue(value);
  };

  const calculateSquareMeter = () => {
    let result =
      selectedSectorTypeItem &&
      selectedProductTypeItem &&
      selectedSectorTypeItem?.costMultiplier *
        selectedProductTypeItem?.price *
        (30 / selectedProductTypeItem?.redecorationCycle);

    Alert.alert(
      `Square meter cost with 30 years re-dedecoration:\n\n  ${
        result && result.toFixed(2)
      } Euro`,
    );
  };

  const renderProjectTypeItem = () => {
    return (
      data &&
      data.projectTypes.map((item: ProjectTypes, index: number) => (
        <Picker.Item key={index} value={item.name} label={item.name} />
      ))
    );
  };

  const renderSectorItem = () => {
    let filteredProjectTypeSectors = data.projectType_sector.filter(
      (projectTypeItem: ProjectType_sector) => {
        if (projectTypeItem.type === selectedProjectTypeValue) {
          return projectTypeItem.sector;
        }
      },
    );

    let filteredSectorNames = filteredProjectTypeSectors.map(
      (item: ProjectType_sector) => {
        return item.sector;
      },
    );

    let filteredSector = data.sectors.filter((sectorItem: Sector) => {
      return filteredSectorNames.includes(sectorItem.name);
    });

    return (
      filteredSector &&
      filteredSector.map((item: Sector, index: number) => {
        return <Picker.Item key={index} value={item.name} label={item.name} />;
      })
    );
  };

  const renderProductItem = () => {
    let filteredSectorProduct = data?.sector_product.filter(
      (sectorProductItem: Sector_product) => {
        if (sectorProductItem.sector === selectedSectorTypeValue) {
          return sectorProductItem;
        }
      },
    );

    let filteredProductrNames = filteredSectorProduct.map(
      (item: Sector_product) => {
        return item.product;
      },
    );

    let filteredProduct = data?.products.filter((productsItem: Product) => {
      return filteredProductrNames.includes(productsItem.name);
    });

    return (
      filteredProduct &&
      filteredProduct.map((item: Product, index: number) => {
        return <Picker.Item key={index} value={item.name} label={item.name} />;
      })
    );
  };

  const renderColorItem = () => {
    return (
      data?.colour &&
      data?.colour.map((item: Colour, index: number) => {
        return <Picker.Item key={index} value={item.name} label={item.name} />;
      })
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.backgroundStyle}>
        <Picker
          itemStyle={styles.pickerItemStyle}
          selectedValue={selectedProjectTypeValue}
          onValueChange={handleProjectTypeValue}>
          {renderProjectTypeItem()}
        </Picker>

        {selectedProjectTypeValue && (
          <Picker
            itemStyle={styles.pickerItemStyle}
            selectedValue={selectedSectorTypeValue}
            onValueChange={handleSectorTypeValue}>
            {renderSectorItem()}
          </Picker>
        )}

        {selectedSectorTypeValue && (
          <Picker
            itemStyle={styles.pickerItemStyle}
            selectedValue={selectedProductTypeValue}
            onValueChange={handleProductTypeValue}>
            {renderProductItem()}
          </Picker>
        )}

        {selectedProductTypeValue && (
          <Picker
            itemStyle={styles.pickerItemStyle}
            selectedValue={selectedColorTypeValue}
            onValueChange={handleColorTypeValue}>
            {renderColorItem()}
          </Picker>
        )}

        {selectedColorTypeValue && (
          <TouchableOpacity
            onPress={calculateSquareMeter}
            style={[
              styles.confirmButtonStyle,
              {
                backgroundColor: selectedColorTypeItem?.hex,
              },
            ]}>
            <Text>Calculate</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  confirmButtonStyle: {
    height: 70,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#add8e6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },

  backgroundStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  pickerItemStyle: {
    height: 150,
  },
});

export default App;
