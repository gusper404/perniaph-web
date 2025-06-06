import { sanityClient } from "sanity:client";
import groq from "groq"

export const getPosts = async () => {
  return await sanityClient.fetch(groq`*[_type == 'photography'] {
    _id,
    _createdAt,
    image {
      asset->{
        url,
        metadata {
          dimensions
        }
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
      rrss,
      slug
    }
  } | order(publishedAt desc)`);
}

// getHomePosts
export const getHomePosts = async () => {
  return await sanityClient.fetch(groq`*[_type == 'photography' && showInHome == true][0...10] {
    _id,
    _createdAt,
     image {
      asset->{
        url,
        metadata {
          dimensions
        }
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
      rrss,
      slug
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

export const getPostByModel = async (slug) => {
  return await sanityClient.fetch(groq`*[_type == 'photography' && model.slug == $slug][0] {
    _id,
    _createdAt,
    image {
      asset->{
        url,
        metadata {
          dimensions
        }
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
  }`)
}

// Obtener todos los slugs únicos de los modelos
export const getAllSlugs = async () => {
  const posts = await getPosts();
  // Extraer los slugs de los modelos, filtrando nulos y duplicados
  const slugs = posts
    .map(post => post.model?.slug)
    .filter(Boolean);
  // Eliminar duplicados
  return Array.from(new Set(slugs));
}