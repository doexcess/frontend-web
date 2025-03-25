'use client';

import PageHeading from '@/components/PageHeading';
import SectionContent from '@/components/SectionContent';
import { Button } from '@/components/ui/Button';
import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { FaPauseCircle, FaBan } from 'react-icons/fa';
import useOrg from '@/hooks/page/useOrg';
import { useParams } from 'next/navigation';
import { formatMoney } from '@/lib/utils';
import Image from 'next/image';

const OrganizationDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const { organization, loading } = useOrg();

  // const organization = {
  //   name: 'Weimmersive Ltd.',
  //   industry: 'Technology & Education',
  //   location: 'San Francisco, CA',
  //   founded: 2018,
  //   employees: 50,
  //   description:
  //     'Weimmersive Ltd. is a leading provider of VR and digital art education solutions for institutions and independent creators.',
  //   contacts: [
  //     { name: 'John Doe', role: 'CEO', email: 'john.doe@weimmersive.com' },
  //     { name: 'Jane Smith', role: 'CTO', email: 'jane.smith@weimmersive.com' },
  //   ],
  //   walletBalance: 12500.75,
  //   products: [],
  //   payments: [],
  //   coupons: [],
  //   customers: [],
  //   subscriptionPlans: [],
  //   multimedia: [],
  //   withdrawalAccount: {},
  //   billingDetails: {},
  // };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className='rounded-xl shadow-lg p-6 text-white'>
            <h2 className='text-3xl font-bold mb-4'>Organization Overview</h2>
            <div className='mb-3'>
              <Image
                src={organization?.logo_url!}
                width={200}
                height={200}
                objectFit={'cover'}
                alt='logo'
                className='rounded-lg border border-gray-400'
              />
            </div>
            <p className='mb-3'>
              <strong>Business name:</strong> {organization?.business_name}
            </p>
            <p className='mb-3'>
              <strong>Industry:</strong> {organization?.industry}
            </p>
            <p className='mb-3'>
              <strong>Location:</strong> {organization?.location}
            </p>
            <p className='mb-3'>
              <strong>Working hours:</strong> {organization?.working_hours}
            </p>
            <p className='mb-3'>
              <strong>Business size:</strong> {organization?.business_size}
            </p>
            <p className='mb-3'>
              <strong>Business size:</strong> {organization?.business_size}
            </p>
            <p className='mb-3'>
              <strong>State:</strong> {organization?.state}
            </p>
            <p>
              <strong>Country:</strong> {organization?.country_code}
            </p>
          </div>
        );
      case 'contacts':
        return <div className='space-y-4'></div>;
      case 'products':
        return <p>Products content goes here.</p>;
      case 'payments':
        return <p>Payments content goes here.</p>;
      case 'coupons':
        return <p>Coupons content goes here.</p>;
      case 'customers':
        return <p>Customers/Members content goes here.</p>;
      case 'subscriptionPlans':
        return <p>Subscription Plans content goes here.</p>;
      case 'multimedia':
        return <p>Multimedia content goes here.</p>;
      case 'withdrawalAccount':
        return <p>Withdrawal Account content goes here.</p>;
      case 'billingDetails':
        return <p>Billing Details content goes here.</p>;
      default:
        return null;
    }
  };

  return (
    <main>
      <header className='section-container'>
        {/* Page heading */}
        <PageHeading
          title={organization?.business_name}
          enableBreadCrumb={true}
          layer2='Organizations'
          layer3={`wiewie`}
          enableBackButton={true}
          ctaButtons={
            <div className='flex gap-2'>
              <Button className='p-2 px-3 space-x-1'>
                <IoIosAdd /> <span>Compose</span>
              </Button>
              <Button className='p-2 px-3 space-x-1' variant='red'>
                <FaBan /> <span>Suspend</span>
              </Button>
            </div>
          }
        />
      </header>

      <SectionContent>
        <div className='px-4'>
          {/* Stats */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
            {[
              {
                label: 'Contacts & Members',
                value: '5,000',
                change: '',
              },
              { label: 'Revenue', value: 'NGN 48,575', change: '+3.84%' },
              { label: 'Orders', value: '4,800+', change: '+1.46%' },
              {
                label: 'Wallet Balance',
                value: formatMoney(
                  +organization?.business_wallet.balance!,
                  organization?.business_wallet.currency
                ),
                change: '',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className='bg-white dark:bg-gray-800 p-4 rounded-md shadow-md'
              >
                <h3 className='text-gray-600 dark:text-white'>{stat.label}</h3>
                <div className='flex gap-2 items-center'>
                  <p className='text-xl font-bold'>{stat.value}</p>
                  {stat.change && (
                    <span
                      className={
                        stat.change.includes('-')
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {stat.change}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className='shadow-lg p-6'>
          <div
            className='
          flex space-x-4 border-b border-gray-200 mb-6 overflow-x-auto whitespace-nowrap'
          >
            {[
              'overview',
              'contacts',
              'products',
              'payments',
              'coupons',
              'customers',
              'subscription Plans',
              'multimedia',
              'withdrawal Account',
              'billing Details',
            ].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-400'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>{renderTabContent()}</div>
        </div>
      </SectionContent>
    </main>
  );
};

export default OrganizationDetails;
