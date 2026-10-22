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

function createStyles(theme: ThemeTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: theme.typography.size.title,
      fontFamily: theme.typography.family.bold,
      letterSpacing: theme.typography.kerning.standard,
      color: theme.colors.text,
    },
    link: {
      marginTop: theme.spacing.md,
      paddingVertical: theme.spacing.md,
    },
    linkText: {
      fontSize: theme.typography.size.body,
      fontFamily: theme.typography.family.medium,
      color: theme.colors.tint,
    },
  })
}
