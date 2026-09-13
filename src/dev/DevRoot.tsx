import {Composition} from 'remotion';
import {DevArchitectureNodes} from './compositions/DevArchitectureNodes';
import {DevAssetPreview} from './compositions/DevAssetPreview';
import {DevMotionBasics} from './compositions/DevMotionBasics';
import {DevTypography} from './compositions/DevTypography';

export const DevRoot: React.FC = () => (
  <>
    <Composition
      id="DEV-Typography"
      component={DevTypography}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="DEV-ArchitectureNodes"
      component={DevArchitectureNodes}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="DEV-MotionBasics"
      component={DevMotionBasics}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="DEV-AssetPreview"
      component={DevAssetPreview}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{assetId: 'restaurantBackground'}}
    />
  </>
);
