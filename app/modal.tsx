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

function createStyles(theme: ThemeTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: theme.typography.size.title,
      fontFamily: theme.typography.family.bold,
      letterSpacing: theme.typography.kerning.standard,
      color: theme.colors.text,
    },
    separator: {
      marginVertical: theme.spacing.xl,
      height: StyleSheet.hairlineWidth,
      width: '80%',
      backgroundColor: theme.colors.border,
    },
  })
}
