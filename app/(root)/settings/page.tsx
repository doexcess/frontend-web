import PageHeading from '@/components/PageHeading';
import Pagination from '@/components/Pagination';
import ProductsList from '@/components/products/ProductsList';
import Filter from '@/components/Filter';
import UsersList from '@/components/organizations/OrgsList';
import React from 'react';

const Settings = () => {
  return (
    <main>
      <header className='section-container'>
        {/* Page heading */}
        <PageHeading
          title='Settings'
          enableBreadCrumb={true}
          layer2='Settings'
        />
        {/* Filter */}
        <Filter searchPlaceholder='Search settings' />
      </header>
      <section className='section-container-padding-0 mt-2'>
        <div className='overflow-x-auto rounded-none'>
          <div className='relative overflow-x-auto'>
            {/* Users list in a table - registered */}
            {/* <ProductsList /> */}

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Settings;
