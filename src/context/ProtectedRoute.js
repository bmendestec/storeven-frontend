import { useAuth } from "@/hooks/AuthContext";
import { Flex, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingOutlined } from '@ant-design/icons';

export default function ProtectedRoute({ children }) {
    const { isAuth, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuth) {
            router.push('/');
        }
    }, [isAuth, loading, router]);

    if (loading) {
        return (
            <div>
                <Flex style={{ display: 'flex', justifyContent: 'center', margin: '50px' }}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                </Flex>
            </div>
        )
    }

    return <>{children}</>;
}