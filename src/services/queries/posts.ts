import { api } from '@/services/network/network';
import { useQuery } from '@tanstack/react-query';
import type { Caregories } from './categories/categories';

export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video' | 'other';
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  userId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  user: User;
  media: Media[];
  category: Caregories;
}
export interface PostsResponse {
  data: Post[];
}

interface PostRequest {
  page?: number;
  limit?: number;
}

const fetchPosts = async ({
  page = 1,
  limit = 10,
}: PostRequest): Promise<PostsResponse> => {
  const response = await api.get('/v1/posts', {
    params: {
      page: page,
      limit: limit,
    },
  });
  return response.data;
};

export const usePostQuery = ({ page, limit }: PostRequest = {}) =>
  useQuery({
    queryKey: ['posts', page, limit],
    queryFn: () => fetchPosts({ page, limit }),
  });
