import {Helmet} from 'react-helmet';
const MetaData = ({title})=>{
    return (
        <Helmet>
            <title>{`${title} | shop it`}</title>
        </Helmet>
    );
}
export default MetaData;