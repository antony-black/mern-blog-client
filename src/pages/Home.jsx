import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags, selectPostsData } from '../redux/slices/posts';
import { Status } from '../consts/status';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector(selectPostsData);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  // console.log('HERE >>>>', posts);
  // console.log('Tags data:', tags);

  if ((posts.status || tags.status) === Status.LOADING) {
    return <div>...loading</div>;
  }

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      {
        <Grid container spacing={4}>
          <Grid xs={8} item>
            {posts.items.map((post) => (
              <Post
                id={post._id}
                title={post.title}
                imageUrl="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Model-Y-Desktop-NA-v3.png"
                user={post.userAuthor}
                createdAt={post.userAuthor.createdAt}
                viewsCount={post.views}
                commentsCount={3}
                tags={post.tags}
                isEditable
              />
            ))}
          </Grid>
          <Grid xs={4} item>
            <TagsBlock items={tags.items} isLoading={tags.status !== Status.LOADING} />
            <CommentsBlock
              items={[
                {
                  user: {
                    fullName: 'Вася Пупкин',
                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  },
                  text: 'Это тестовый комментарий',
                },
                {
                  user: {
                    fullName: 'Иван Иванов',
                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                  },
                  text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                },
              ]}
              isLoading={false}
            />
          </Grid>
        </Grid>
      }
    </>
  );
};
