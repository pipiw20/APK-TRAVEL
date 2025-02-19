import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import Details from './Details';

function Destination() {
  const navigation = useNavigation();

  const width = Dimensions.get('screen').width;

  const scrollViewRef = useRef(null);

  const images = [
    require('./../assets/pantaiD.png'),
    require('./../assets/gunungD.png'),
    require('./../assets/bersamaD.png'),
  ];
  useEffect(() => {
    let scrollPosition = 0;
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        scrollPosition += width; // Pindah ke gambar berikutnya
        scrollViewRef.current.scrollTo({x: scrollPosition, animated: true});

        // Jika sudah mencapai akhir, kembali ke awal
        if (scrollPosition >= width * (images.length - 1)) {
          scrollPosition = -width; // Set ke -width agar animasi terlihat smooth saat kembali
          setTimeout(() => {
            scrollViewRef.current.scrollTo({x: 0, animated: false});
          }, 500); // Waktu jeda untuk menyelesaikan animasi terakhir
        }
      }
    }, 3000); // Scroll setiap 3 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#FAEDCE'}}>
      <View>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          contentContainerStyle={{height: 150}}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16} // Agar smooth
          pagingEnabled={true} // Membuat scroll snap ke tiap halaman
        >
          {images.map((image, index) => (
            <View
              key={index}
              style={{
                height: 150,
                backgroundColor: '#5A6C57',
                borderBottomLeftRadius: 23,
                borderBottomRightRadius: 23,
              }}>
              <Image
                style={{
                  height: 160,
                  width: width,
                  borderBottomLeftRadius: 60,
                  borderBottomRightRadius: 60,
                  marginTop: 20,
                }}
                source={image}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={{padding: 20}}>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('Details');
              }}
              style={{
                height: 100,
                width: '100%',
                backgroundColor: '#5A6C57',
                marginBottom: 10,
                borderRadius: 10,
                elevation: 10,
                padding: 10,
              }}>
              <Text style={{fontSize: 30, color: '#FAEDCE'}}>Title</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* TAMBAH */}

      <TouchableOpacity
        onPress={() => navigation.navigate('Diary')}
        style={{
          width: 75,
          height: 70,
          justifyContent: 'center',
          right: 20,
          bottom: 20,
          position: 'absolute',
        }}>
        <Image
          source={require('./../assets/plus.png')}
          style={{height: 65, width: 65}}
        />
      </TouchableOpacity>
      {/* TAMBAH */}
    </View>
  );
}

export default Destination;
