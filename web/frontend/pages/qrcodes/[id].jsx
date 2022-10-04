import { Loading, TitleBar } from "@shopify/app-bridge-react";
import { Card, Layout, Page, SkeletonBodyText } from "@shopify/polaris";
import { useParams } from "react-router-dom";
import { QRCodeForm } from "../../components";
import { useAppQuery } from "../../hooks";

export default function QRCodeEdit() {
  const { id } = useParams();

  /*
    Fetch the QR code.
    useAppQuery uses useAuthenticatedQuery from App Bridge to authenticate the request.
    The backend supplements app data with data queried from the Shopify GraphQL Admin API.
  */
  const {
    data: QRCode,
    isLoading,
    isRefetching,
  } = useAppQuery({
    url: `/api/qrcodes/${id}`,
    reactQueryOptions: {
      /* Disable refetching because the QRCodeForm component ignores changes to its props */
      refetchOnReconnect: false,
    },
  });

  const breadcrumbs = [{ content: "QR codes", url: "/" }];

  /* Loading action and markup that uses App Bridge and Polaris components */
  if (isLoading || isRefetching) {
    return (
      <Page>
        <TitleBar
          title="Edit QR code"
          breadcrumbs={breadcrumbs}
          primaryAction={null}
        />
        <Loading />
        <Layout>
          <Layout.Section>
            <Card sectioned title="Title">
              <SkeletonBodyText />
            </Card>
            <Card title="Product">
              <Card.Section>
                <SkeletonBodyText lines={1} />
              </Card.Section>
              <Card.Section>
                <SkeletonBodyText lines={3} />
              </Card.Section>
            </Card>
            <Card sectioned title="Discount">
              <SkeletonBodyText lines={2} />
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card sectioned title="QR code" />
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page>
      <TitleBar
        title="Edit QR code"
        breadcrumbs={breadcrumbs}
        primaryAction={null}
      />
      <QRCodeForm QRCode={QRCode} />
    </Page>
  );
}
