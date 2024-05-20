'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Chip,
  Grid,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  ImageList,
  ImageListItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
import RootLayout from '@/app/layout';
import Loading from '@/app/loading';
import DashboardCard from '@/app/components/shared/DashboardCard';
import ProductDetailSection from '@/app/components/product/ProductDetailSection';

import dynamic from 'next/dynamic';
import { StarRounded } from '@mui/icons-material';

import Image from 'next/image';

type WeekDays = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
type BookingKeys = `available_booking_${WeekDays}`;

const MatchDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  //   useEffect(() => {
  //     const handleResize = () => {
  //       if (typeof window !== 'undefined') {
  //         setWidth(window.innerWidth);
  //       }
  //     };

  //     window.addEventListener('resize', handleResize);
  //     return () => window.removeEventListener('resize', handleResize);
  //   }, []);

  //   useEffect(() => {
  //     if (typeof window !== 'undefined' && id) {
  //       const fetchData = async () => {
  //         const response = await fetch(`/api/product/${id}`);
  //         const data: SalesItem = await response.json();
  //         setProduct(data);
  //       };
  //       fetchData();
  //     }
  //   }, [id]);

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  const renderStars = (rating: number) => {
    const totalStars = Math.round(rating);
    return Array.from({ length: totalStars }, (_, index) => (
      <StarRounded key={index} style={{ color: '#FFD700', marginRight: 4 }} />
    ));
  };

  //   if (!product) {
  //     return (
  //       <RootLayout>
  //         <Loading />
  //       </RootLayout>
  //     );
  //   }

  function isBookingKey(key: any): key is BookingKeys {
    return [
      'available_booking_mon',
      'available_booking_tue',
      'available_booking_wed',
      'available_booking_thu',
      'available_booking_fri',
      'available_booking_sat',
      'available_booking_sun',
    ].includes(key);
  }

  return (
    <RootLayout>
      <PageContainer title="Product Dashboard" description="This is the Product Dashboard">
        <DashboardCard title={`產品詳情 - 編號：`}></DashboardCard>
      </PageContainer>
    </RootLayout>
  );
};

export default dynamic(() => Promise.resolve(MatchDetail), {
  ssr: false,
});
