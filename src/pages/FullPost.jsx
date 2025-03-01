import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axiosInstance from '../axios';

export const FullPost = () => {
  const [postData, setPostData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/posts/single/${id}`)
      .then((res) => {
        setPostData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert(`You can't get the post. Due to the error.`);
      });
  }, []);

  if (isLoading) {
    return <div>...loading</div>;
  }

  return (
    <>
      <Post
        id={postData._id}
        title={postData.title}
        imageUrl="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Model-Y-Desktop-NA-v3.png"
        user={postData.userAuthor}
        createdAt={postData.userAuthor.createdAt}
        viewsCount={postData.views}
        commentsCount={3}
        tags={postData.tags}
        isFullPost>
        <p>ADD TEXT!</p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  );
};
