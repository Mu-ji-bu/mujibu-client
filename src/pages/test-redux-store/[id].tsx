import { setIsFollow, selectProject } from '../../store/slices/projects/projectSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
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

const Projects = ({ data }) => {
  const { projectName, isFollow } = useAppSelector(selectProject);
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
        variant={isFollow ? 'contained' : 'outlined'}
        endIcon={isFollow ? <BookmarkOutlinedIcon /> : <BookmarkAddOutlinedIcon />}
        onClick={() => dispatch(setIsFollow())}
      >
        {isFollow ? '已追蹤專案' : '追蹤專案'}
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

export default Projects;
