import { FC, useEffect, useState } from 'react'
import { useSocketContext } from '../../../context'
import { Img, P } from '../../atoms'
import { AuctionBidButton, AuctionBidder, CurrentValueContainer } from '../../molecules'

import { AuctionItemInfoWrapper, ImageWrapper, InfoWrapper, Wrapper } from './styles'

interface AuctionItemProps {
	id: number
	name: string
	type: string
	image: string
	bidCost: number
	worth: number
	timeStart: string
	timeEnd: string
	bidderImage: string
	bidderName: string
	currentPrice: number
}

const AuctionItem: FC<AuctionItemProps> = ({
	id,
	name,
	type,
	image,
	bidCost = 1,
	worth = 10,
	timeStart,
	timeEnd,
	bidderImage,
	bidderName,
	currentPrice = 0.0,
}) => {
	const { bidOnAuction, auctionsBiddingOn } = useSocketContext()

	const [timeLeft, setTimeLeft] = useState(0)
	const [hasNotBegun, setHasNotBegun] = useState(true)
	const [auctionCompleted, setAuctionCompleted] = useState(false)

	const timeStartUnix = Date.parse(timeStart)
	const timeEndUnix = Date.parse(timeEnd)

	// Loads everything
	useEffect(() => {
		// check if it has begun by comparing the time now and the start time
		setHasNotBegun(Date.now() < timeStartUnix)

		// if we are waiting for it to start, the target time is the start, else it's the end
		const targetTime = Date.now() < timeStartUnix ? timeStartUnix : timeEndUnix

		setTimeLeft(targetTime - Date.now())
	}, [timeEnd])

	// Lowers the timer every second
	useEffect(() => {
		const timer = setInterval(() => {
			if (hasNotBegun && Date.now() >= timeStartUnix) {
				setHasNotBegun(false)
			}

			if (!auctionCompleted && Date.now() >= timeEndUnix) {
				setAuctionCompleted(true)
			}

			const targetTime = Date.now() < timeStartUnix ? timeStartUnix : timeEndUnix

			if (Date.now() < targetTime) {
				setTimeLeft(targetTime - Date.now())
			}

			// if the targettime is null
			if (isNaN(targetTime)) {
				setTimeLeft(0)
			}
		}, 1000)
		return () => clearInterval(timer)
	}, [timeStartUnix, timeEndUnix, timeLeft])

	// seconds to HH:MM:SS, we can't do multiple days of wait
	// Gives 10 seconds if there is no time left
	const timeLeftFormatted = new Date(timeLeft || 10000).toISOString().substr(11, 8)

	return (
		<Wrapper>
			<P fontSize={['1.5rem', '1.5rem', '1.5rem', '1.5rem', '2rem']} fontWeight={700} color={'white'}>
				{name}
			</P>
			<P
				fontSize={['1rem', '1rem', '1rem', '1rem', '1.1rem']}
				fontWeight={700}
				color={'primary'}
				textTransform={'uppercase'}
			>
				{type}
			</P>
			<ImageWrapper>
				<Img src={image} objectFit={'cover'} width={'100%'} maxWidth={220} />
				<AuctionItemInfoWrapper big>
					<P fontSize={'0.8rem'} color={'gray-lighter'} textTransform={'uppercase'}>
						{hasNotBegun ? 'Begins In' : 'Time Left'}
					</P>
					<P fontSize={'1.1rem'} color={'white'} textTransform={'uppercase'}>
						{timeLeftFormatted}
					</P>
				</AuctionItemInfoWrapper>
				<AuctionItemInfoWrapper>
					<P fontSize={'0.8rem'} color={'gray-lighter'} textTransform={'uppercase'}>
						Worth
					</P>
					<P color={'white'} textTransform={'uppercase'}>
						${worth.toFixed(2)}
					</P>
				</AuctionItemInfoWrapper>
				{bidCost > 1 && (
					<AuctionItemInfoWrapper>
						<P fontSize={'0.8rem'} color={'gray-lighter'} textTransform={'uppercase'}>
							Bid Cost
						</P>
						<P color={'white'} textTransform={'uppercase'}>
							{bidCost}
						</P>
					</AuctionItemInfoWrapper>
				)}
			</ImageWrapper>
			<InfoWrapper>
				<AuctionBidder image={bidderImage} name={bidderName} />
				<CurrentValueContainer label={'Current Price'} value={currentPrice} inDollars />
				<AuctionBidButton
					count={bidCost}
					onClick={() => bidOnAuction(id)}
					disabled={
						hasNotBegun ||
						auctionsBiddingOn.findIndex((auctionId) => auctionId === id) !== -1 ||
						auctionCompleted
					}
				/>
			</InfoWrapper>
		</Wrapper>
	)
}

export default AuctionItem
