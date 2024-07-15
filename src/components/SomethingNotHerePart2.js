import React, { useState, useEffect } from 'react'
import { TextInput, StyleSheet, View, ActivityIndicator } from 'react-native'
import { Search as SearchIcon, ChevronDown, Search } from '@tamagui/lucide-icons'
import { useFocusEffect } from '@react-navigation/native'

import {
  Text as TGText,
  isWeb,
  Input as TGInput,
  View as TGView,
  Image as TGImage,
  ScrollView as TGScrollView,
  Text,
  Stack,
  ScrollView,
  XStack,
  Input,
  XGroup,
} from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons'
import { styled } from 'tamagui'
import { Image } from 'tamagui'
import { SolitoImage } from 'solito/image'

const StyledInput = styled(TGInput, {
  name: 'Search',
  color: '$white',
  height: 45,
  hoverStyle: {
    borderColor: '$transparent',
    outlineColor: 'transparent',
  },
  focusStyle: {
    borderColor: '$transparent',
    outlineColor: 'transparent',
  },
})

const TitleStyling = styled(TGText, {
  color: 'white',
  marginBottom: 5,
  fontSize: 18,
  fontWeight: '600',

  // $gtLg={{ fontSize: 12 }}
})

const SearchBarContainer = styled(TGView, {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
  marginTop: 20,
  backgroundColor: 'white',
  marginHorizontal: 15,
  paddingVertical: 10,
  borderWidth: 1,
  borderRadius: 4,
})

interface Props {
  width: any
  setBackgroundcolor: string
  position: string
  zi: number
  height: any
  $gtLg: any
  qwerrySearched: string
}

const SearchScreen = ({
  setBackgroundcolor,
  position = isWeb ? 'absolute' : 'relative',
  width,
  height,
  $gtLg,
  qwerrySearched,
}: Props) => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [visible, setVisible] = useState(false)

  const setDropDown = () => {
    setVisible(true)
    console.log('Sooo not working')
  }

  // const getTrendingData = async (query = "") => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `https://api.themoviedb.org/3/${
  //         query ? "search/movie" : "trending/movie/day"
  //       }?api_key=ff78f911e0dbd4c6c56dd3096993fb27`,
  //       {
  //         params: {
  //           ...(query
  //             ? { query, include_adult: false, language: "en-US", page: "1" }
  //             : {}),
  //         },
  //       }
  //     );
  //     setRecords(response.data.results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };

  const handleSearch = (search) => {
    setSearchQuery(search)
    console.log('Inside the handleSearch', searchQuery)
    filterTrendingData()

    if (!search) {
      fetchTrendingData()
    }
  }
  const fetchTrendingData = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
        params: {
          api_key: 'ff78f911e0dbd4c6c56dd3096993fb27',
          page: 2,
        },
      })
      setRecords(response.data.results)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchTrendingData()
  }, [])

  console.log('Outside the handleSearch', searchQuery)

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchTrendingData()
  //   }, [])
  // )

  const filterTrendingData = () => {
    if (searchQuery) {
      console.log('This is working')
      const filteredData = records.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setRecords(filteredData)
    } else {
      console.log('Here also not working')
      setRecords(records)
    }
  }

  console.log(records)
  // MoivePosterPath
  const MoviePoster = ({ posterPath }) => {
    const basePosterUrl = 'https://image.tmdb.org/t/p/w500'

    return (
      // <Image
      //   width="100%"
      //   height="100%"
      //   resizeMode="cover"
      //   source={{ uri: `${basePosterUrl}${posterPath}` }}
      // />
      <SolitoImage
        width={isWeb ? 70 : 100}
        height={isWeb ? 70 : 100}
        contentFit="cover"
        quality={90}
        src={`${basePosterUrl}${posterPath}`}
        loader={({ quality, src, width }) => {
          return `${basePosterUrl}${posterPath}`
        }}
        style={{ borderRadius: 10 }}
        alt="Course Picked"
      />
      // <SolitoImage
      //   width={100}
      //   height={100}
      //   contentFit="cover"
      //   src="/Users/Kilowott/mindset-ui-apps/apps/expo/assets/onion.jpg"
      //   alt="A cool artist's image."
      // />
    )
  }

  // console.log(searchQuery)
  console.log(qwerrySearched)

  // HighLighting The searchItem
  const highlightSearchQuery = (text) => {
    if (searchQuery && text) {
      const lowerCaseQuery = searchQuery.toLowerCase()
      const lowerCaseText = text.toLowerCase()

      let highlightedText = []

      for (let i = 0; i < lowerCaseText.length; i++) {
        const querySubstring = lowerCaseText.substring(i, i + lowerCaseQuery.length)
        if (querySubstring === lowerCaseQuery) {
          highlightedText.push(
            <Text key={i} backgroundColor="yellow" color="black">
              {text.substring(i, i + lowerCaseQuery.length)}
            </Text>
          )
          i += lowerCaseQuery.length - 1
        } else {
          highlightedText.push(text[i])
        }
      }
      return (
        <TitleStyling fontSize={isWeb ? 12 : 14} marginLeft={isWeb ? 20 : 20}>
          {highlightedText}
        </TitleStyling>
      )
    } else {
      return (
        <TitleStyling fontSize={isWeb ? 12 : 14} marginLeft={isWeb ? 20 : 20}>
          {text}
        </TitleStyling>
      )
    }
  }

  // Trimming the description and adding ... at the last
  const trimTextByWordCount = (text, maxWords = 18) => {
    const words = text.split(' ')
    if (words.length > maxWords) {
      const trimmedText = words.slice(0, maxWords).join(' ') + '...'

      return trimmedText
    }
    return text
  }

  return (
    <Stack
      backgroundColor={setBackgroundcolor}
      flex={1}
      $gtLg={{ height: 484 }}
      position={position}
      width={width}
      zi={3}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View borderRadius={20}>
          {/* {isWeb ? null : ( */}
          <SearchBarContainer $gtLg={{ display: 'none' }}>
            <Search size={30} color="black" />
            <View flex={1} marginLeft={20}>
              <Input
                placeholder="Search Experts, Courses, Topics and more"
                onChangeText={handleSearch}
                backgroundColor="$white"
                borderWidth={0}
                $lg={{ borderWidth: 0 }}
                color="$black"
              />
            </View>
          </SearchBarContainer>
          {/* <XGroup
            $lg={{ display: 'none' }}
            alignItems="center"
            bg="$secondary"
            bordered={true}
            paddingHorizontal={5}
            borderColor="$secondaryLight"
            width={width}
            marginLeft={8}
            height={45}
            onPress={setDropDown}
            // onBlur={() => setVisible(false)}
          >
            <XGroup.Item>
              <Stack pl={8}>
                <SearchIcon color="$white" size={20} />
              </Stack>
            </XGroup.Item>
            <XGroup.Item>
              <StyledInput
                width="100%"
                placeholder="Search Experts, Courses, Topics and more"
                focusStyle={{ outlineColor: 'transparent', borderColor: 'transparent' }}
                hoverStyle={{ borderColor: 'transparent' }}
                bg="transparent"
                borderColor="transparent"
                textAlign="left"
                // onPressIn={setDropDown}
                onChangeText={handleSearch}
              />
            </XGroup.Item>
          </XGroup> */}
          {/* )} */}
          <View>
            <View height={310} $gtLg={{ height: 'auto' }} zi={3}>
              {loading ? (
                <ActivityIndicator size="large" color="white" style={{ marginTop: 30 }} />
              ) : (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  paddingHorizontal={2}
                  marginTop={20}
                >
                  {records.length > 0 ? (
                    records.map((item, index) => (
                      <View key={index}>
                        <XStack
                          flexDirection="row"
                          alignItems="center"
                          marginTop={10}
                          paddingHorizontal={20}
                          paddingVertical={10}
                        >
                          <View
                            borderRadius={10}
                            height={70}
                            width={70}
                            overflow="hidden"
                            $gtLg={{ height: 30, width: 30 }}
                          >
                            <MoviePoster posterPath={item.poster_path} />
                          </View>
                          <View flex={1} flexDirection="column">
                            {highlightSearchQuery(item.title)}

                            <Text
                              fontWeight="400"
                              color="gray"
                              fontSize={isWeb ? 12 : 14}
                              marginLeft={isWeb ? 20 : 20}
                            >
                              {item.release_date}
                            </Text>
                          </View>
                        </XStack>
                      </View>
                    ))
                  ) : (
                    <View flex={1} justifyContent="center" alignItems="center" marginTop={20}>
                      <Text color="white" fontSize={18} fontWeight="600">
                        No Data Available
                      </Text>
                    </View>
                  )}
                </ScrollView>
              )}
            </View>
            {/* Article Section */}
            <View marginTop={45} marginBottom={10} marginHorizontal={22}>
              <Text
                color="white"
                fontSize={20}
                $gtLg={{ fontSize: 14 }}
                fontWeight="700"
                marginLeft={isWeb ? 20 : 0}
                marginTop={isWeb ? 10 : 0}
                marginBottom={isWeb ? 10 : 0}
              >
                Articles
              </Text>
            </View>
            <View height={300} $gtLg={{ height: 'auto' }}>
              {loading ? (
                <ActivityIndicator size="large" color="white" marginTop={30} />
              ) : (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  paddingHorizontal={2}
                  $gtLg={{ margin: 20 }}
                >
                  {records.length > 0 ? (
                    records.map((item, index) => (
                      <View key={index}>
                        <View
                          flexDirection="column"
                          alignItems="center"
                          marginTop={10}
                          paddingHorizontal={20}
                          paddingVertical={8}
                          // $gtLg={{ marginLeft: 20 }}
                        >
                          <XStack
                            flexDirection="row"
                            alignItems="center"
                            marginLeft={isWeb ? 20 : 0}
                          >
                            <View height={60} width={60} overflow="hidden" borderRadius={10}>
                              <MoviePoster posterPath={item.poster_path} />
                            </View>
                            <View $gtLg={{ marginLeft: 5 }} flex={1}>
                              {highlightSearchQuery(item.title)}
                            </View>
                          </XStack>
                          <View marginTop={8} marginRight={20}>
                            <Text
                              color="#FFFFFF"
                              fontWeight={300}
                              $gtLg={{ fontSize: 11, marginLeft: 20 }}
                              // marginLeft={isWeb ? 20 : 0}
                            >
                              {trimTextByWordCount(item.overview)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))
                  ) : (
                    <View flex={1} justifyContent="center" alignItems="center" marginTop={20}>
                      <Text color="white" fontSize={18} fontWeight="600">
                        No Data Available
                      </Text>
                    </View>
                  )}
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </Stack>
  )
}
export default SearchScreen
