import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  TextInputProps,
} from "react-native"
import React, { Dispatch, FC, SetStateAction } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Icon } from "../../assets/icons/wholeSeller"
import { color } from "../../utils"

interface SearchFieldProps {
  setQuery: Dispatch<SetStateAction<string>>
  handleOnSearchIcon: () => void
  query: string
  handleDelete: () => void
  isLoading?: boolean
  debouncedSearch?: any
}

const SearchField: FC<SearchFieldProps | TextInputProps> = ({
  setQuery,
  handleOnSearchIcon,
  query,
  isLoading,
  handleDelete,
  debouncedSearch,
}) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ padding: Platform.OS === "ios" ? 10 : 0 }}>
        <View style={styles.container}>
          <View style={styles.leftPart}>
            <TouchableOpacity activeOpacity={0} onPress={handleOnSearchIcon}>
              <Image source={Icon.Search} style={styles.image} />
            </TouchableOpacity>

            <TextInput
              style={styles.searchText}
              placeholder="Search Text....."
              placeholderTextColor="rgba(0, 0, 0, 0.50)"
              onChangeText={(text) => {
                setQuery(text.trimEnd())
                debouncedSearch(text)
              }}
              value={query}
            />
          </View>
          {query && (
            <TouchableOpacity activeOpacity={0} onPress={handleDelete}>
              <Image source={Icon.CLOSE} style={[styles.image, { paddingTop: 8 }]} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.50)",
    borderRadius: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 5,
  },
  leftPart: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "93%",
  },
  image: {
    width: 24,
    height: 24,
  },
  searchText: {
    padding: 8,
    fontSize: 16,
    flex: 1,
    color: color.LIGHT_GRAY,
  },
})

export default SearchField
