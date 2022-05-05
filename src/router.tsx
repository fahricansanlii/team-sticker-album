import { AppLayout } from 'components/AppLayout/AppLayout';
import { LoadingIndicator } from 'components/LoadingIndicator/LoadingIndicator';
import { CustomRouter } from 'routing/CustomRouter';
import { history } from 'routing/my-history';

const Router = () => {
    return (
        <CustomRouter history={history}>
            <AppLayout></AppLayout>
            <LoadingIndicator></LoadingIndicator>
        </CustomRouter>
    );
};

export default Router;
