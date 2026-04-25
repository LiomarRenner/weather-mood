import { Link, Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { useThemedStyles, type ThemeTokens } from '@/core/theme'

export default function NotFoundScreen() {
  const styles = useThemedStyles(createStyles)

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  )
}

function createStyles(colors: ThemeTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: colors.backgroundColor,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text, // TODO atualizar para token específico de link quando tivermos tokens mais granulares
    },
    link: {
      marginTop: 15,
      paddingVertical: 15,
    },
    linkText: {
      fontSize: 14, // TODO atualizar para token específico de texto secundário quando tivermos tokens mais granulares
      color: colors.text, // TODO atualizar para token específico de link quando tivermos tokens mais granulares
    },
  })
}