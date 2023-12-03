import {
  ImprovementsImg,
  InsightsImg,
  NextStepsImg,
  PositivesImg,
} from '../../../../assets/images/cop/exercise';
import PathRoutes from '../../../../routers/paths';

export const ExerciseItems = {
  insights: {
    img: InsightsImg,
    next_route: PathRoutes.communityOfPractice.positives,
  },
  positives: {
    img: PositivesImg,
    next_route: PathRoutes.communityOfPractice.improvements,
  },
  improvements: {
    img: ImprovementsImg,
    next_route: PathRoutes.communityOfPractice.next_steps,
  },
  next_steps: {
    img: NextStepsImg,
    next_route: PathRoutes.communityOfPractice.finish,
  },
};
