import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { useThemedStyles, type ThemeTokens } from '@/core/theme'

export default function ModalScreen() {
  const styles = useThemedStyles(createStyles)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}
// TODO atualizar os tokens
function createStyles(colors: ThemeTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.backgroundColor,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text, 
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
      backgroundColor: colors.backgroundColor,
    },
  })
}