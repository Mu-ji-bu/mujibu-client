import { useRouter } from 'next/router';

const ProjectSelectPage = () => {
  const router = useRouter();
  const { userId, projectPlanId } = router.query;

  return (
    <div>
      <h1>Project Select Page</h1>
      <p>User ID: {userId}</p>
      <p>Clicked projectPlan ID: {projectPlanId}</p>
    </div>
  );
};

export default ProjectSelectPage;
