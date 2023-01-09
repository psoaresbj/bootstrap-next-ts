import Error from 'next/error';

import StyleGuide from '../page-components/StyleGuide';

export default process.env.NODE_ENV !== 'production' ? StyleGuide : () => <Error statusCode={404} />;
