import {checker, createValidate} from '../../util/validation';
import createUploadBox from '../../molecule/brand-upload-box';
import createDownloadBox from '../../molecule/brand-download-box';
import createUploadLoading from '../../molecule/brand-upload-loading';
import style from './style.css';

const conditions = checker.shape({
  props: checker.shape({
    title: checker.string.optional,
    loading: checker.bool.optional,
    upload: checker.object,
    download: checker.object
  }),
  children: checker.none
});

export default (treant, options = {}) => {
  const {h} = treant;
  const DownloadBox = createDownloadBox(treant, options);
  const UploadBox = createUploadBox(treant, options);
  const UploadLoading = createUploadLoading(treant, options);

  const BrandUpload = (props, children) => {
    const {
      title = '',
      download,
      upload,
      loading
    } = props;

    let uploadView;
    if (loading) {
      uploadView = <UploadLoading {...upload}/>;
    }
    else {
      uploadView = <UploadBox {...upload}/>;
    }

    // <DownloadBox {...download}/>

    return (
      <div className={style.wrapper}>
        <div className={style.title}>
          <h3>{title}</h3>
        </div>
        {uploadView}
      </div>
    );
  };

  BrandUpload.validate = createValidate(conditions);
  return BrandUpload;
};
