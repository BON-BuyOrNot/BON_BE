import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private idCounter = 1;

  create(createPostDto: CreatePostDto): Post {
    const newPost: Post = {
      id: this.idCounter++,
      ...createPostDto,
    };
    this.posts.push(newPost);
    return newPost;
  }
}