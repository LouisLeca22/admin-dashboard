import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const New = ({ inputs, type }) => {
  const navigate = useNavigate()
  const [file, setFile] = useState('');
  const { i18n, t } = useTranslation(['new']);
  const [newInputs, setNewInputs] = useState(inputs);
  const [data, setData] = useState({});
  const [percentage, setPercentage] = useState(null)

  useEffect(() => {
    const uploadFile = () => {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `/${type}/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPercentage(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:  
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData(prev => ({...prev, img: downloadURL}))
          });
        }
      );
    };

    file && uploadFile();
  }, [file, type]);


  useEffect(() => {
    if (type==="users") {
      setNewInputs((prev) =>
        prev.map((input) => {
          switch (input.id) {
            case 'username':
              return { ...input, label: t('username') };
            case 'displayName':
              return { ...input, label: t('displayName') };
            case 'email':
              return { ...input, label: t('email') };
            case 'phone':
              return { ...input, label: t('phone') };
            case 'password':
              return { ...input, label: t('password') };
            case 'address':
              return { ...input, label: t('address') };
            case 'country':
              return { ...input, label: t('country') };
            default:
              return input;
          }
        })
      );
    } else if (type==="products") {
      setNewInputs((prev) =>
        prev.map((input) => {
          switch (input.id) {
            case 'title':
              return { ...input, label: t('title') };
            case 'description':
              return { ...input, label: t('description') };
            case 'category':
              return { ...input, label: t('category') };
            case 'price':
              return { ...input, label: t('price') };
            case 'stock':
              return { ...input, label: t('stock') };
            default:
              return input;
          }
        })
      );
    }
  }, [i18n, t, inputs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        await addDoc(collection(db, type), {
          ...data,
          timeStamp: serverTimestamp(),
        });

        navigate(`/${type}`)
      } catch (error) {
        console.log(error);
      }
    

  };

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div className='top'>
          {type === 'users' && <h1>{t('addNewUser')}</h1>}
          {type === 'products' && <h1>{t('addNewProduct')}</h1>}
        </div>
        <div className='bottom'>
          <div className='left'>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=''
            />
          </div>
          <div className='right'>
            <form onSubmit={handleSubmit}>
              <div className='formInput'>
                <label htmlFor='file'>
                  {t('image')}:{' '}
                  <DriveFolderUploadOutlinedIcon className='icon' />
                </label>
                <input
                  type='file'
                  id='file'
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>

              {newInputs.map((input) => (
                <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    id={input.id}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <button disabled={percentage !== null  && percentage < 100} type='submit'>{t('send')}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
