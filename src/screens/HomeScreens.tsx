import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsive } from '../theme/useResponsive';

const DATA = Array.from({ length: 40 }).map((_, i) => ({
  id: i.toString(),
  title: `Product ${i}`,
  height: i % 3 === 0 ? 300 : 220,
  color: i % 2 === 0 ? '#FEE2E2' : '#E0F2FE'
}));

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const { columns } = useResponsive();

  const renderProduct = ({ item }: any) => (
    <View style={[styles.card, { height: item.height }]}>
      <View style={[styles.image, { backgroundColor: item.color }]} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>$99.00</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.flex}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        
        <View style={styles.stickyHeader}>
          <Text style={styles.logo}>PREMIUM STORE</Text>
          <View style={styles.searchBar}>
            <TextInput placeholder="Search products..." style={styles.input} />
          </View>
        </View>

        <FlashList
          data={DATA}
          renderItem={renderProduct}
          numColumns={columns}
          key={columns}
          contentContainerStyle={styles.listPadding}
          ListHeaderComponent={() => (
            <View style={styles.heroSection}>
              <View style={styles.overlappingBox}>
                <Text style={styles.heroText}>SUMMER SALE</Text>
              </View>
            </View>
          )}
        />

        <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
          <Text style={styles.footerText}>Sticky Footer - Checkout Now</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  stickyHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    zIndex: 10,
  },
  logo: { fontSize: 18, fontWeight: '900', letterSpacing: 1, marginBottom: 10 },
  searchBar: { height: 45, backgroundColor: '#F3F4F6', borderRadius: 10, paddingHorizontal: 15 },
  input: { flex: 1 },
  listPadding: { padding: 10 },
  heroSection: { height: 150, justifyContent: 'center', marginBottom: 20 },
  overlappingBox: {
    backgroundColor: '#000',
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: 20 }],
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  heroText: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6'
  },
  image: { flex: 1 },
  info: { padding: 12 },
  title: { fontWeight: '600', fontSize: 14 },
  price: { color: '#6B7280', fontSize: 12, marginTop: 4 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 15,
  },
  footerText: { color: '#FFF', fontWeight: 'bold' }
});

export default HomeScreen;