import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import { IPlanState } from '@/types/plan';
import { IProjectState } from '@/types/project';

import { useAppSelector } from '@libraries/hooks/reduxHooks';
import { selectUser } from '../../store/slices/userSlice';
import { useGetProjectByIdQuery } from '@/store/services/projectApi';
import { usePostUserCollectMutation } from '@/store/services/userApi';

import ProjectPlan from '@/components/pages/projects/ProjectPlan';
import ProjectsLayout from '@/components/layout/ProjectsLayout';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';
import Loading from '@/components/Loading';
import Seo from '@/components/Seo';

const fakeProjectPlan: IPlanState = {
  _id: '1',
  planOrders: ['1', '2'],
  planName: '超薄可折疊筆記電腦套組',
  planType: '超早鳥限時優惠',
  planDiscountPrice: 309,
  planOriginalPrice: 936,
  planImage: '/project/Desktop_Project_plan1.png',
  planQuantity: 100,
  planStartTime: new Date('2023-06-01'),
  planEndTime: new Date('2023-06-30'),
  planDescription:
    '這款超薄可折疊筆記電腦套組提供了高效的處理器和充足的存儲空間，讓您能夠在不同的場景中輕鬆地進行多任務處理。',
  otherNotes: [
    '內容物： 超薄可折疊筆記電腦本體x1，充電器x1，保護套x1，筆記本鼠標x1，使用說明書x1',
    '贈送市值2000元螢幕保護膜',
  ],
  isRealProduct: true,
  createdAt: new Date('2023-06-01'),
  updatedAt: new Date('2023-06-01'),
};

const Project = () => {
  const router = useRouter();
  // 在 introduction/id 按上一頁，會來到這邊，這邊的 plan 不對，所以先改名為 id.tsx

  const { id: projectId } = router.query;

  const { data, isLoading } = useGetProjectByIdQuery(projectId);
  const user = useAppSelector(selectUser);
  const userId = user._id;
  const [followed, setFollowed] = useState(false);

  const [postUserCollect, { isLoading: postUserCollectLoading }] = usePostUserCollectMutation();

  const handleFollow = async () => {
    if (!userId) {
      return alert('請登入');
    }
    await postUserCollect({ userId, projectId }).then((res: any) => {
      try {
        if (res?.data.status === 'Success') {
          setFollowed(!followed);
        }
      } catch (err) {
        alert('已新增');
      }
    });
  };
  const dataList = useMemo((): any => data?.data || [], [data?.data]);

  const handleProjectPlanClick = (userId: string, projectPlanId: string) => {
    router.push(`/projects/select/${userId}?projectPlanId=${projectPlanId}`);
  };

  return (
    <>
      <Seo templateTitle="專案介紹" />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ProjectsLayout followed={followed} handleFollow={handleFollow} projectState={dataList}>
            <div className="details w-full flex justify-center gap-6">
              <div className="flex flex-col w-2/3 my-auto">
                <div className="news h-16 flex items-center bg-gray-light pl-5 rounded-lg">
                  <span aria-label="homepage" className="text-secondary-66 flex items-center">
                    <VolumeUpIcon fontSize="small" />
                  </span>
                  <Typography component="span" variant="body16" className="mr-3">
                    最新消息
                  </Typography>
                  <Typography component="span" variant="body16" className="text-secondary-66">
                    感謝支持，2/1 起計畫將轉為「長期販售」。
                  </Typography>
                </div>
                <div className="desc p-5 my-8 bg-green-accent-10 rounded-lg border border-solid border-green-accent">
                  <Typography component="p" variant="body20" className="text-primary">
                    專案描述約50字/這款全新超薄可折疊筆記電腦不僅極致輕盈，還擁有長續航力和高效性能，讓你在隨時隨地輕鬆完成工作任務。同時，它還支持高清顯示和網絡連接，讓你在工作之餘輕鬆享受高品質的影音娛樂體驗，自由靈活，隨時隨地，盡享美好生活。
                  </Typography>
                </div>
                <Image
                  src={dataList.projectImage || '/project/Desktop_Project_1.png'}
                  alt="project1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div className="paragraph1 my-8">
                  <Typography component="h4" variant="h4" className="text-secondary mb-3">
                    輕盈極致，帶你走遍天涯海角
                  </Typography>

                  <Typography component="p" variant="body16" className="text-secondary-66 mb-6">
                    全新超薄可折疊筆記本，不僅輕薄便攜，更具有耐用性和高質感。它擁有超長電池續航力，讓你隨時隨地滿足你的工作和娛樂需求。憑藉其極致便攜性，你可以隨時隨地使用它進行報告、演示或會議，輕鬆完成各種工作任務。
                  </Typography>
                  <Typography component="p" variant="body16" className="text-secondary-66">
                    這款筆記本融合了極致便攜性和強大性能，讓你的工作效率得到極大提升。在旅途中，你可以隨時隨地使用它進行報告、演示或會議；在家中，你可以輕鬆處理日常生活事務，享受高清電影和遊戲。無論你是學生、上班族還是自由工作者，全新超薄可折疊筆記本都是你不可或缺的工作夥伴。現在，就選擇它，讓工作更加高效，讓生活更加自由！
                  </Typography>
                </div>

                <Image
                  src={'/project/Desktop_Project_2.png'}
                  alt="project1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div className="paragraph2 my-8">
                  <Typography component="h4" variant="h4" className="text-secondary mb-3">
                    無縫連接，助你在多場景中輕鬆切換
                  </Typography>

                  <Typography component="p" variant="body16" className="text-secondary-66">
                    全新超薄可折疊筆記本配備了多種接口和無線連接功能，可與各種設備輕鬆連接，實現多場景切換。不管你身在何處，都能快速連接到網絡，編輯文檔、收發郵件、視訊會議等等，一切都變得更加便捷高效。此外，全新超薄可折疊筆記本還支持高速無線網絡連接，讓你隨時隨地上網，盡情享受快速穩定的網絡體驗。
                  </Typography>
                </div>

                <div className="paragraph2-1 mb-8">
                  <Typography component="h4" variant="h4" className="text-secondary mb-3">
                    極致輕盈，隨時隨地帶著走
                  </Typography>

                  <Typography component="p" variant="body16" className="text-secondary-66 mb-6">
                    全新超薄可折疊筆記本是一款輕盈、細小的產品，重量僅為數百克，厚度不到 2
                    厘米，可以隨時隨地隨身攜帶，無論是在家裡、辦公室還是旅途中，都能夠輕鬆携帶。此外，全新超薄可折疊筆記本還搭載了多個實用的應用軟件，這些軟件將為你的工作和生活帶來更多的便利。比如，它可以預先安裝辦公軟件，如Microsoft
                    Office、Adobe Creative
                    Suite等等，這些軟件是現代人必不可少的辦公工具，它們可以讓你輕鬆處理文檔、編輯圖片和視頻等等，讓你的工作效率得到極大提升。
                  </Typography>

                  <Typography component="p" variant="body16" className="text-secondary-66 mb-6">
                    全新超薄可折疊筆記本還支持雲存儲和多平臺同步，這意味著你可以在不同的設備上同步你的文檔和數據，實現真正的無縫切換。它還搭載了多種安全保護功能，可以有效保護你的數據和隱私安全，讓你的工作和生活更加安心。
                  </Typography>
                  <Typography component="p" variant="body16" className="text-secondary-66">
                    總的來說，全新超薄可折疊筆記本是一款集極致便攜性、強大性能和多功能於一身的未來科技產品。它可以讓你隨時隨地完成工作任務，還可以輕鬆滿足你的娛樂需求。它無論是外觀設計還是功能性能都達到了極致水平，是現代人工作和生活的理想選擇。如果你正在尋找一款高品質的筆記本電腦，不妨考慮全新超薄可折疊筆記本，相信它會讓你滿意。
                  </Typography>
                </div>
                <Image
                  src={'/project/Desktop_Project_3.png'}
                  alt="project1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div className="paragraph3 my-8">
                  <Typography component="h4" variant="h4" className="text-secondary mb-3">
                    強大性能，提升你的工作效率
                  </Typography>

                  <Typography component="p" variant="body16" className="text-secondary-66 mb-6">
                    全新超薄可折疊筆記本搭載了高效的處理器和充足的存儲空間，可應對各種複雜的工作場景和高要求的應用程序。它還支持高清顯示和網絡連接，讓你在處理工作任務的同時，還能輕鬆享受高品質的影音娛樂體驗。
                  </Typography>

                  <Typography component="p" variant="body16" className="text-secondary-66">
                    在運行大型軟件、處理大量數據、編輯高清視頻等方面，全新超薄可折疊筆記本都能夠輕鬆應對，讓你的工作效率得到極大提升，達到事半功倍的效果。
                  </Typography>
                </div>
                <Image
                  src={'/project/Desktop_Project_4.png'}
                  alt="project1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div className="paragraph4 my-8">
                  <Typography component="h4" variant="h4" className="text-secondary mb-3">
                    值得信賴的團隊 LiteConnect
                  </Typography>

                  <Typography component="p" variant="body16" className="text-secondary-66 mb-6">
                    LiteConnect Inc.
                    是一家年輕有活力的科技公司，專注於創新科技產品的開發和製造。我們擁有一支由技術專家、設計師和市場營銷人員組成的團隊，致力於提供高品質的產品和優質的客戶服務。
                  </Typography>
                  <Typography component="p" variant="body16" className="text-secondary-66">
                    我們的團隊成員具有高度的責任感和創意思維，深入研究市場趨勢和客戶需求，不斷創新和推陳出新。我們不斷優化產品的性能和外觀，並致力於提供最優秀的使用體驗。在過去的幾年中，我們已經成功推出了多款優質的產品，包括智能手機、平板電腦和筆記本電腦等等。我們的產品廣泛應用於個人、商務、教育和娛樂等各個領域，深受客戶喜愛和信任。我們的團隊將繼續秉持著責任感和創意精神，不斷開發和創新，為客戶提供更多高品質、高性能、高便攜性的產品。{' '}
                  </Typography>
                </div>

                <div className="more-info bg-gray-light py-5 pl-5 rounded-lg">
                  <div className="questions">
                    <Typography component="span" variant="h6" className="text-secondary-66">
                      對計畫還有其他疑問嗎？請見
                    </Typography>
                    <Link href={'/faq'} className="no-underline visited:text-primary text-primary font-medium">
                      常見問答
                    </Link>
                    <Typography component="span" variant="h6" className="text-secondary-66">
                      。
                    </Typography>
                  </div>
                  <div className="contact-us">
                    <Typography component="span" variant="h6" className="text-secondary-66">
                      認為此專案有違規或不適合募質部使用者的地方嗎？請
                    </Typography>
                    <Link href={'/about-us'} className="no-underline visited:text-primary text-primary font-medium">
                      聯繫我們
                    </Link>
                    <Typography component="span" variant="h6" className="text-secondary-66">
                      。
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="w-1/3 flex flex-col gap-6">
                <ProjectPlan
                  projectId={dataList._id || '0'}
                  // projectPlan={dataList[0].projectPlans[0] ?? fakeProjectPlan}
                  projectPlan={fakeProjectPlan}
                  handleProjectPlanClick={handleProjectPlanClick}
                />
                <ProjectPlan
                  projectId={dataList._id || '1'}
                  projectPlan={fakeProjectPlan}
                  handleProjectPlanClick={handleProjectPlanClick}
                />
                <ProjectPlan
                  projectId={dataList._id || '2'}
                  projectPlan={fakeProjectPlan}
                  handleProjectPlanClick={handleProjectPlanClick}
                />
              </div>
            </div>
          </ProjectsLayout>
        </>
      )}
    </>
  );
};

export default Project;
