import { sanityClient } from "sanity:client";
import groq from "groq"

export const getPosts = async () => {
  return await sanityClient.fetch(groq`*[_type == 'photography'] {
    _id,
    _createdAt,
    image {
      asset->{
        url
      }
    },
    category->{
      _id,
      title
    },
    location->{
      _id,
      title
    },
    model->{
      fullname,
      rrss
    }
  } | order(publishedAt desc)`);
}

export const getSettings = async () => {
  return await sanityClient.fetch(groq`*[_id == 'settings'][0] {
    title, 
    bio,
    image {
      asset->{
        url
      }
    },
    rrss
  }`)
}