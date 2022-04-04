import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Chart from '../../components/chart/Chart';
import List from '../../components/table/Table';
import { db } from '../../firebase';
import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Single = () => {
  const { t } = useTranslation(['single', "chart"]);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { type } = location.state;

  const [document, setDocument] = useState(null);

  useEffect(() => {
    const ref = doc(collection(db, type), id);
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        setDocument({ ...snapshot.data(), id: snapshot.id });
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsub();
  }, [type, id]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, type, id));
      navigate(`/${type}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />
        {document && (
          <>
            <div className='top'>
              <div className='left'>
                <div className='deleteButton' onClick={handleDelete}>
                  {t('single:delete')}
                </div>
                <h1 className='title'>{t('single:information')}</h1>
                <div className='item'>
                  <img src={document.img} alt='' className='itemImg' />
                  <div className='details'>
                    {type === 'users' ? (
                      <>
                        <h1 className='itemTitle'>{document.displayName}</h1>
                        <div className='detailItem'>
                          <span className='itemKey'>{t('single:email')}:</span>
                          <span className='itemValue'>{document.email}</span>
                        </div>
                        <div className='detailItem'>
                          <span className='itemKey'>{t('single:phone')}:</span>
                          <span className='itemValue'>{document.phone}</span>
                        </div>
                        <div className='detailItem'>
                          <span className='itemKey'>{t('single:address')}:</span>
                          <span className='itemValue'>{document.address}</span>
                        </div>
                        <div className='detailItem'>
                          <span className='itemKey'>{t('single:country')}:</span>
                          <span className='itemValue'>{document.country}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <h1 className='itemTitle'>{document.title}</h1>
                        <div className='detailItem'>
                          <span className='itemKey'>{t('single:category')}:</span>
                          <span className='itemValue'>{document.category}</span>
                        </div>
                        <div className='detailItem'>
                          <span className='itemKey'>{t('single:size')}:</span>
                          <span className='itemValue'>{document.size}</span>
                        </div>
                        <div className='detailItem'>
                          <span className='itemKey'>{t('single:price')}:</span>
                          <span className='itemValue'>{document.price}</span>
                        </div>
                        <div className='detailItem'>
                          <span className='itemKey'>{t('single:stock')}:</span>
                          <span className='itemValue'>{document.stock}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className='right'>
                {type === 'users' && (
                  <Chart
                    aspect={3 / 1}
                    title={t("chart:lastUser")}
                    user={['clientID', '==', id]}
                  />
                )}
                {type === 'products' && (
                  <Chart
                    aspect={3 / 1}
                    title={t("chart:lastProduct")}
                    product={['productID', '==', id]}
                  />
                )}
              </div>
            </div>
            <div className='bottom'>
              <h1 className='title'>{t('single:transactions')}</h1>
              {type === 'users' && <List user={['clientID', '==', id]} />}
              {type === 'products' && (
                <List product={['productID', '==', id]} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Single;
