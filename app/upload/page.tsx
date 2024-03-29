'use client';

import { useState } from 'react';
import Container from '@/components/layout/Container';
import Navigation from '@/components/layout/Navigation';
import { UploadFile } from '@/components/upload';
import Row from '@/components/layout/Row';

const UploadPage = () => {
  const [firstFile, setFirstFile] = useState<string | undefined>(undefined);
  const [secondFile, setSecondFile] = useState<string>(
    'morning-react-ui-data/images/login_background.jpeg',
  );

  return (
    <>
      <Navigation>
        <h1>Upload page</h1>
      </Navigation>
      <Container>
        <h2>Upload Files</h2>
        <Row style={{ height: '240px', marginInline: '10%' }}>
          <UploadFile
            buttonLabel={'Ajouter une image de couverture'}
            destinationBucket={'planeur'}
            destinationPath={'uploads/'}
            onChange={setFirstFile}
            fileUrl={
              firstFile && `https://cdn.morning.fr/resize/500/300/${firstFile}`
            }
          ></UploadFile>
          <UploadFile
            buttonLabel={'Ajouter une image de couverture'}
            destinationBucket={'planeur'}
            destinationPath={'uploads'}
            fileUrl={
              secondFile &&
              `https://cdn.morning.fr/resize/500/300/${secondFile}`
            }
            onChange={setSecondFile}
          ></UploadFile>
        </Row>
        <Row style={{ background: 'var(--cloud)' }}>
          <Row
            style={{
              height: '240px',
              width: '700px',
              margin: '0 auto',
              padding: '8px 10%',
            }}
          >
            <UploadFile
              buttonLabel={'Ajouter une image de couverture'}
              destinationBucket={'planeur'}
              destinationPath={'uploads/'}
              onChange={setFirstFile}
              fileUrl={
                firstFile &&
                `https://cdn.morning.fr/resize/500/300/${firstFile}`
              }
            ></UploadFile>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default UploadPage;
