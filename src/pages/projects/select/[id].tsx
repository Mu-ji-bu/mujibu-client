import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProjectSelectPage = () => {
  const router = useRouter();
  const [projectPlanId, setProjectPlanId] = useState('');

  useEffect(() => {
    // 取得 projectPlanId 參數的值
    setProjectPlanId(router.query.projectPlanId as string);

    // 移除網址中的 projectPlanId 參數
    const urlWithoutParam = window.location.href.replace(`?projectPlanId=${projectPlanId}`, '');

    // 使用 replaceState 方法修改網址，不會產生新的歷史紀錄
    window.history.replaceState({}, '', urlWithoutParam);
  }, [projectPlanId, router.query.projectPlanId]);

  return (
    <div>
      <h1>Project Select Page</h1>
      <p>Clicked projectPlan ID: {projectPlanId}</p>
    </div>
  );
};

export default ProjectSelectPage;
