import { setIsCarousel, selectProject } from '../../store/slices/projectSlice';
import { useAppSelector, useAppDispatch } from '../../libraries/hooks/reduxHooks';
import { wrapper } from '../../store/store';

import {
  useGetPostsListQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
  getRunningQueriesThunk,
  getPosts,
} from '../../store/services/postApi';
import Button from '@mui/material/Button';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Projects = ({ data }: { data: Post }) => {
  const { projectName, carousel } = useAppSelector(selectProject);
  const dispatch = useAppDispatch();

  const { data: postsList, error: listError, isLoading: listIsLoading } = useGetPostsListQuery();

  // const { data: post, error: postError, isLoading: postIsLoading } = useGetPostsQuery('2');
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  console.log('postsList', postsList);
  // console.log('post', post);
  // console.log('error', error);
  // console.log('isLoading', isLoading);

  const handleUpdatePost = async (postId: number) => {
    try {
      const result = await updatePost({ id: postId, title: '123', body: 'new body' });
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="text-primary">Redux</h1>
      <h2 className="text-green-accent">專案狀態</h2>
      <h3>專案名稱：{projectName}</h3>
      <Button
        variant={carousel ? 'contained' : 'outlined'}
        endIcon={carousel ? <BookmarkOutlinedIcon /> : <BookmarkAddOutlinedIcon />}
        onClick={() => dispatch(setIsCarousel())}
      >
        {carousel ? '取消為大輪播專案' : '設定為大輪播專案'}
      </Button>

      <h2 className="text-green-accent">SSR fetch 單一文章</h2>
      {console.log('data', data)}
      {data && (
        <div>
          <span>
            <p></p>文章編號 {data.id}
          </span>
          <p>文章標題 {data.title}</p>
        </div>
      )}

      <h2 className="text-green-accent">Patch 單一文章</h2>
      <Button variant="outlined" onClick={() => handleUpdatePost(2)}>
        修改文章
      </Button>

      <h2 className="text-green-accent">FC fetch 文章列表</h2>
      {listIsLoading && <div>Loading...</div>}
      <ul>
        {postsList &&
          postsList.map((item, i) => {
            return <li key={`user${i + 1}`}>{item.title}</li>;
          })}
      </ul>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.query;
  console.log('id', id);
  if (typeof id === 'string') {
    store.dispatch(getPosts.initiate(id));
  }
  const [data] = await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return {
    props: {
      data: data.data,
    },
  };
});

export default Projects;
