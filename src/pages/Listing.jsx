import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import db from "../firebase.config"
import Spinner from "../components/Spinner"
import shareIcon from '../assets/svg/shareIcon.svg'
import { toast } from "react-toastify"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setListing(docSnap.data())
                setLoading(false)
            } else{
                toast.error('Listing does not exists.', { autoClose: 5000 })
                navigate('/')
            }
        }

        fetchListing()
    }, [navigate, params.listingId])

    if(loading) {
        return <Spinner />
    }

  return (
    <main>
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            style={{ height: '300px' }}
        >
            {listing.imgUrls.map((url, index) => {
            return (
                    <SwiperSlide key={index}>
                        <div
                            className='swiperSlideDiv'
                            style={{
                                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                                backgroundSize: 'cover',
                            }}
                        ></div>
                    </SwiperSlide>
                );
            })}
        </Swiper>

        <div className="shareIconDiv" onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopied(true)
            setTimeout(() => {setShareLinkCopied(false)}, 2000)
        }}>
            <img src={shareIcon} alt="" />
        </div>
        
        {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

        <div className="listingDetails">
            <p className="listingName">
                {listing.name} - ${listing.offer
                    ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </p>
            <p className="listingLocation">{listing.address}</p>
            <p className="listingType">
                For {listing.type === 'rent' ? 'Rent' : 'Sale'}
            </p>
            {listing.offer && (
                <p className="discountPrice">
                    ${listing.regularPrice - listing.discountedPrice} discount
                </p>
            )}
            <ul className="listingDetailsList">
                <li>
                    {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
                </li>
                <li>
                    {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
                </li>
                <li>{listing.parking && 'Parking Spot'}</li>
                <li>{listing.furnished && 'Furnished'}</li>
            </ul>
            <p className="listingLocationTitle">Location</p>
            <li>{listing.address}</li>
            {auth.currentUser?.uid !== listing.userRef && (
                <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className="primaryButton">
                    Contact Landlord
                </Link> 
            )}
        </div>
    </main>
  )
}

export default Listing