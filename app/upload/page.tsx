import Container from '@/components/layout/Container';
import Navigation from '@/components/layout/Navigation';
import { UploadImage } from '@/components/upload';
import Columns from '@/components/layout/Columns';

const UploadPage = () => {
  return (
    <>
      <Navigation>
        <h1>Upload page</h1>
      </Navigation>
      <Container>
        <h2>Upload Image</h2>
        <Columns>
          <UploadImage
            buttonLabel={'Ajouter une image de couverture'}
          ></UploadImage>
        </Columns>
      </Container>
    </>
  );
};

export default UploadPage;
