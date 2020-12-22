import { Fragment, useState } from 'react'
import Head from '../components/Head'
import { AuctionStats, Footer, Header, PageBox } from '../components/molecules'
import { DepositItemsPopup, NavigationBar, PackageItem, PurchasePackagePopup } from '../components/organisms'
import { PageTemplate } from '../components/templates'
import { ItemsWrapper } from './_styles/packages'

import { PackageItemParam } from '@app-types'

const Packages = () => {
	const [purchasePopupOpen, setPurchasePopupOpen] = useState(false)
	const [depositPopupOpen, setDepositPopupOpen] = useState(false)
	const [selectedPackage, setSelectedPackage] = useState<PackageItemParam>({
		id: '',
		name: '',
		totalTokens: 0,
		extraTokens: 0,
		price: 0,
		image: '',
	})

	const purchaseAction = (packageItem: PackageItemParam) => {
		if (packageItem.id !== 'CUSTOM') {
			setPurchasePopupOpen(true)
			setSelectedPackage(packageItem)
		} else {
			setDepositPopupOpen(true)
		}
	}

	return (
		<Fragment>
			<Head title={'Packages'} />
			<PageTemplate navigation={<NavigationBar />} footer={<Footer />}>
				<Header image={'/img/packages-header.png'} mobileImage={'/img/packages-header-mobile.png'} />
				<PageBox page={'PACKAGES'} />
				<AuctionStats
					stats={[
						{ description: '| Just sold for $4.41', value: 'Tempered AK47' },
						{ description: 'Items sold in last 48 hours', value: 12 },
						{ description: 'Total Items Listed', value: 142 },
						{ description: 'Users created in last 48 hours', value: 2 },
						{ description: 'Total Users', value: 3214 },
					]}
				/>
				<ItemsWrapper>
					<PackageItem
						id={'BASIC'}
						name={'Basic Package'}
						totalTokens={500}
						price={5}
						image={'/img/500package.png'}
						purchaseAction={purchaseAction}
					/>
					<PackageItem
						id={'PLUS'}
						name={'Plus Package'}
						totalTokens={1000}
						price={10}
						image={'/img/1000package.png'}
						purchaseAction={purchaseAction}
					/>
					<PackageItem
						id={'BASIC'}
						name={'Basic Package'}
						totalTokens={2200}
						extraTokens={200}
						price={20}
						image={'/img/2000package.png'}
						purchaseAction={purchaseAction}
					/>
					<PackageItem
						id={'BASIC'}
						name={'Basic Package'}
						totalTokens={5500}
						extraTokens={500}
						price={50}
						image={'/img/5000package.png'}
						purchaseAction={purchaseAction}
					/>
					<PackageItem
						id={'BASIC'}
						name={'Basic Package'}
						totalTokens={12000}
						extraTokens={2000}
						price={100}
						image={'/img/10000package.png'}
						purchaseAction={purchaseAction}
					/>
					<PackageItem
						id={'BASIC'}
						name={'Basic Package'}
						totalTokens={30000}
						extraTokens={5000}
						price={250}
						image={'/img/25000package.png'}
						purchaseAction={purchaseAction}
					/>
					<PackageItem
						id={'BASIC'}
						name={'Basic Package'}
						totalTokens={65000}
						extraTokens={15000}
						price={500}
						image={'/img/50000package.png'}
						purchaseAction={purchaseAction}
					/>
					<PackageItem
						id={'CUSTOM'}
						name={'Basic Package'}
						image={'/img/custompackage.png'}
						purchaseAction={purchaseAction}
					/>
				</ItemsWrapper>
			</PageTemplate>
			<PurchasePackagePopup open={purchasePopupOpen} setOpen={setPurchasePopupOpen} item={selectedPackage} />
			<DepositItemsPopup open={depositPopupOpen} setOpen={setDepositPopupOpen} />
		</Fragment>
	)
}

export default Packages
