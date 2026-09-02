"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, Disc3, Star, Users, Package, ChevronRight, Quote, Check, Mail, Phone, Instagram, Facebook, Twitter, Search, Heart, ShoppingBag, Crown, Sparkles, TrendingUp, Shield, Truck, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [formState, setFormState] = useState({ name: '', email: '', message: '', genre: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('loading')
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CONSTRUCTOR_API}/v1/forms/${process.env.NEXT_PUBLIC_PROJECT_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      })
      if (response.ok) {
        setFormStatus('success')
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const genres = ['Jazz', 'Rock Clásico', 'Bossa Nova', 'Tango', 'Soul', 'Salsa', 'Electrónica', 'Folk Latinoamericano']

  const featuredRecords = [
    { id: 1, artist: 'Astor Piazzolla', album: 'Libertango', genre: 'Tango', condition: 'Mint', year: 1974 },
    { id: 2, artist: 'Caetano Veloso', album: 'Transa', genre: 'MPB', condition: 'Near Mint', year: 1972 },
    { id: 3, artist: 'Rubén Blades', album: 'Siembra', genre: 'Salsa', condition: 'Very Good Plus', year: 1978 },
    { id: 4, artist: 'Mercedes Sosa', album: 'Mujeres Argentinas', genre: 'Folk', condition: 'Excellent', year: 1969 },
    { id: 5, artist: 'Gal Costa', album: 'India', genre: 'MPB', condition: 'Mint', year: 1973 },
    { id: 6, artist: 'Soda Stereo', album: 'Signos', genre: 'Rock', condition: 'Very Good', year: 1986 },
  ]

  const testimonials = [
    { text: 'Encontré una primera edición de Piazzolla que llevaba años buscando. La calificación de condición fue exactamente como se describía. Servicio impecable.', role: 'Coleccionista de Jazz', location: 'Buenos Aires' },
    { text: 'Como dueño de tienda, la membresía Vendedor me ha permitido conectar con coleccionistas de toda Latinoamérica. Mi negocio creció un 40% este año.', role: 'Propietario de Tienda', location: 'Ciudad de México' },
    { text: 'El servicio de búsqueda personalizada localizó un vinnil de Violeta Parra que pensé nunca encontraría. Vale cada centavo de la membresía premium.', role: 'Coleccionista de Folk', location: 'Santiago' },
  ]

  const stats = [
    { number: '50,000+', label: 'Vinilos en Catálogo' },
    { number: '12', label: 'Países Conectados' },
    { number: '8,500+', label: 'Coleccionistas Activos' },
    { number: '99.2%', label: 'Satisfacción' },
  ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F0F0F', color: '#F5E6D3' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{ backgroundColor: 'rgba(15, 15, 15, 0.95)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <Disc3 className="w-10 h-10" style={{ color: '#D4AF37' }} />
              <span className="text-2xl font-serif tracking-wide" style={{ fontFamily: 'Playfair Display, serif', color: '#D4AF37' }}>Vintage Vinyl</span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {['Catálogo', 'Géneros', 'Membresías', 'Nosotros'].map((item) => (
                <Link 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-sm tracking-widest uppercase transition-colors duration-300 hover:opacity-80"
                  style={{ fontFamily: 'Source Sans Pro, sans-serif', color: '#F5E6D3' }}
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button className="p-2 transition-colors hover:opacity-70">
                <Search className="w-5 h-5" style={{ color: '#F5E6D3' }} />
              </button>
              <button className="p-2 transition-colors hover:opacity-70 relative">
                <Heart className="w-5 h-5" style={{ color: '#F5E6D3' }} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-xs rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37', color: '#0F0F0F' }}>
                    {wishlist.length}
                  </span>
                )}
              </button>
              <Button 
                className="ml-4 px-6 py-2 text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#D4AF37', color: '#0F0F0F', fontFamily: 'Source Sans Pro, sans-serif' }}
              >
                Iniciar Sesión
              </Button>
            </div>

            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" style={{ color: '#D4AF37' }} /> : <Menu className="w-6 h-6" style={{ color: '#D4AF37' }} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          style={{ backgroundColor: '#1A1612' }}
        >
          <div className="px-4 py-6 space-y-4">
            {['Catálogo', 'Géneros', 'Membresías', 'Nosotros'].map((item) => (
              <Link 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-lg tracking-wider"
                style={{ fontFamily: 'Source Sans Pro, sans-serif', color: '#F5E6D3' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Button 
              className="w-full mt-4 py-3"
              style={{ backgroundColor: '#D4AF37', color: '#0F0F0F' }}
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Split */}
      <section className="min-h-screen pt-20 flex items-center" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <Badge 
                className="px-4 py-2 text-xs tracking-widest uppercase"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37', border: '1px solid #D4AF37' }}
              >
                La Comunidad de Vinilo más Grande de Latinoamérica
              </Badge>
              
              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight"
                style={{ fontFamily: 'Playfair Display, serif', color: '#F5E6D3' }}
              >
                Donde el Vinilo<br />
                <span style={{ color: '#D4AF37' }}>Cobra Vida</span>
              </h1>
              
              <p 
                className="text-lg lg:text-xl leading-relaxed opacity-80 max-w-lg"
                style={{ fontFamily: 'Source Sans Pro, sans-serif' }}
              >
                Descubre tesoros sonoros de toda Latinoamérica. Conectamos coleccionistas apasionados con los discos que definen generaciones.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="px-8 py-6 text-base tracking-wider uppercase flex items-center gap-2 transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: '#D4AF37', color: '#0F0F0F', fontFamily: 'Source Sans Pro, sans-serif' }}
                  onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explorar Catálogo
                  <ChevronRight className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline"
                  className="px-8 py-6 text-base tracking-wider uppercase transition-all duration-300 hover:scale-105"
                  style={{ borderColor: '#D4AF37', color: '#D4AF37', backgroundColor: 'transparent', fontFamily: 'Source Sans Pro, sans-serif' }}
                  onClick={() => document.getElementById('membresias')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Membresías
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                      style={{ backgroundColor: '#1A1612', borderColor: '#D4AF37' }}
                    >
                      <Users className="w-4 h-4" style={{ color: '#D4AF37' }} />
                    </div>
                  ))}
                </div>
                <p className="text-sm opacity-70" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                  Más de 8,500 coleccionistas activos
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div 
                className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 0 80px rgba(212, 175, 55, 0.15)' }}
              >
                <Image 
                  src="/images/hero.png"
                  alt="Colección de vinilos vintage"
                  fill
                  className="object-cover"
                  priority
                />
                <div 
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(26, 22, 18, 0.3) 0%, transparent 50%)' }}
                />
              </div>
              <div 
                className="absolute -bottom-6 -left-6 p-6 rounded-xl"
                style={{ backgroundColor: '#1A1612', border: '1px solid rgba(212, 175, 55, 0.3)' }}
              >
                <p className="text-3xl font-serif" style={{ fontFamily: 'Playfair Display, serif', color: '#D4AF37' }}>50K+</p>
                <p className="text-sm opacity-70" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>Vinilos Disponibles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Genre Navigation */}
      <section className="py-8 overflow-x-auto" style={{ backgroundColor: '#1A1612' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 min-w-max">
            {genres.map((genre) => (
              <button
                key={genre}
                className="px-6 py-3 rounded-full text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 whitespace-nowrap"
                style={{ 
                  backgroundColor: 'rgba(212, 175, 55, 0.1)', 
                  color: '#D4AF37', 
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  fontFamily: 'Source Sans Pro, sans-serif'
                }}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16" style={{ backgroundColor: '#0F0F0F', borderTop: '1px solid rgba(212, 175, 55, 0.2)', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p 
                  className="text-3xl lg:text-5xl mb-2"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#D4AF37' }}
                >
                  {stat.number}
                </p>
                <p 
                  className="text-sm tracking-wider uppercase opacity-70"
                  style={{ fontFamily: 'Source Sans Pro, sans-serif' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="catalogo" className="py-20 lg:py-32" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <Badge 
                className="px-4 py-2 text-xs tracking-widest uppercase mb-4"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37', border: '1px solid #D4AF37' }}
              >
                Selección Curada
              </Badge>
              <h2 
                className="text-3xl lg:text-5xl"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Vinilos <span style={{ color: '#D4AF37' }}>Destacados</span>
              </h2>
            </div>
            <Link 
              href="#catalogo"
              className="flex items-center gap-2 text-sm tracking-wider uppercase transition-colors hover:opacity-80"
              style={{ color: '#D4AF37', fontFamily: 'Source Sans Pro, sans-serif' }}
            >
              Ver Catálogo Completo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredRecords.map((record) => (
              <Card 
                key={record.id}
                className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-[1.02]"
                style={{ backgroundColor: '#1A1612', border: '1px solid rgba(212, 175, 55, 0.2)' }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image 
                    src="/images/feature.png"
                    alt={`${record.album} by ${record.artist}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
                    style={{ backgroundColor: 'rgba(15, 15, 15, 0.8)' }}
                  >
                    <button 
                      onClick={() => toggleWishlist(record.id)}
                      className="p-3 rounded-full transition-all duration-300 hover:scale-110"
                      style={{ backgroundColor: wishlist.includes(record.id) ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)', border: '1px solid #D4AF37' }}
                    >
                      <Heart className={`w-5 h-5 ${wishlist.includes(record.id) ? 'fill-current' : ''}`} style={{ color: wishlist.includes(record.id) ? '#0F0F0F' : '#D4AF37' }} />
                    </button>
                    <button 
                      className="p-3 rounded-full transition-all duration-300 hover:scale-110"
                      style={{ backgroundColor: '#D4AF37' }}
                    >
                      <ShoppingBag className="w-5 h-5" style={{ color: '#0F0F0F' }} />
                    </button>
                  </div>
                  <Badge 
                    className="absolute top-4 right-4 text-xs"
                    style={{ backgroundColor: '#D4AF37', color: '#0F0F0F' }}
                  >
                    {record.condition}
                  </Badge>
                </div>
                <div className="p-6">
                  <p className="text-xs tracking-wider uppercase mb-2 opacity-60" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                    {record.genre} · {record.year}
                  </p>
                  <h3 className="text-xl mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#F5E6D3' }}>
                    {record.album}
                  </h3>
                  <p className="text-sm opacity-70" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                    {record.artist}
                  </p>
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
                    <p className="text-lg" style={{ fontFamily: 'Playfair Display, serif', color: '#D4AF37' }}>
                      Consultar Precio
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section id="nosotros" className="py-20 lg:py-32" style={{ backgroundColor: '#1A1612' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge 
              className="px-4 py-2 text-xs tracking-widest uppercase mb-4"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37', border: '1px solid #D4AF37' }}
            >
              Nuestros Servicios
            </Badge>
            <h2 
              className="text-3xl lg:text-5xl mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Todo para el <span style={{ color: '#D4AF37' }}>Coleccionista</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Large Card */}
            <div 
              className="lg:col-span-2 lg:row-span-2 p-8 lg:p-12 rounded-2xl relative overflow-hidden group"
              style={{ backgroundColor: '#0F0F0F', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              <div className="relative z-10">
                <Crown className="w-12 h-12 mb-6" style={{ color: '#D4AF37' }} />
                <h3 className="text-2xl lg:text-3xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Sistema de Calificación de Condición
                </h3>
                <p className="text-lg opacity-70 mb-8 max-w-lg" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                  Nuestro sistema de grading profesional garantiza que sepas exactamente lo que estás adquiriendo. Desde Mint hasta Fair, cada disco es evaluado por expertos.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Mint', 'Near Mint', 'Very Good', 'Good'].map((grade) => (
                    <div 
                      key={grade}
                      className="p-4 rounded-lg text-center"
                      style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                    >
                      <p className="text-sm font-medium" style={{ color: '#D4AF37' }}>{grade}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div 
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: '#D4AF37' }}
              />
            </div>

            {/* Small Cards */}
            <div 
              className="p-8 rounded-2xl"
              style={{ backgroundColor: '#0F0F0F', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              <Search className="w-10 h-10 mb-4" style={{ color: '#D4AF37' }} />
              <h3 className="text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Búsqueda Personalizada
              </h3>
              <p className="opacity-70 text-sm" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                ¿Buscas algo específico? Nuestros cazadores de vinilos lo encontrarán por ti.
              </p>
            </div>

            <div 
              className="p-8 rounded-2xl"
              style={{ backgroundColor: '#0F0F0F', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              <Users className="w-10 h-10 mb-4" style={{ color: '#D4AF37' }} />
              <h3 className="text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Perfiles de Coleccionista
              </h3>
              <p className="opacity-70 text-sm" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                Crea tu perfil, muestra tu colección y conecta con otros entusiastas.
              </p>
            </div>

            <div 
              className="lg:col-span-3 p-8 rounded-2xl grid sm:grid-cols-3 gap-8"
              style={{ backgroundColor: '#0F0F0F', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-medium mb-1" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>Compra Protegida</h4>
                  <p className="text-sm opacity-70">Garantía de autenticidad en cada transacción</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Truck className="w-8 h-8 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-medium mb-1" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>Envío Seguro</h4>
                  <p className="text-sm opacity-70">Embalaje especializado para vinilos</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-medium mb-1" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>Soporte Dedicado</h4>
                  <p className="text-sm opacity-70">Atención personalizada de expertos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 lg:py-32" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge 
              className="px-4 py-2 text-xs tracking-widest uppercase mb-4"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37', border: '1px solid #D4AF37' }}
            >
              Cómo Funciona
            </Badge>
            <h2 
              className="text-3xl lg:text-5xl"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Tu Viaje <span style={{ color: '#D4AF37' }}>Comienza Aquí</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Crea tu Perfil', desc: 'Regístrate y personaliza tu perfil de coleccionista con tus géneros favoritos' },
              { step: '02', title: 'Explora el Catálogo', desc: 'Navega por miles de vinilos filtrados por género, condición y artista' },
              { step: '03', title: 'Conecta y Negocia', desc: 'Contacta vendedores verificados y negocia directamente' },
              { step: '04', title: 'Recibe tu Tesoro', desc: 'Disfruta de envío seguro con embalaje especializado para vinilos' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div 
                  className="text-6xl font-serif mb-4 opacity-20"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#D4AF37' }}
                >
                  {item.step}
                </div>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {item.title}
                </h3>
                <p className="text-sm opacity-70" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                  {item.desc}
                </p>
                {index < 3 && (
                  <ChevronRight 
                    className="hidden md:block absolute top-8 -right-4 w-8 h-8 opacity-30"
                    style={{ color: '#D4AF37' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 lg:py-32" style={{ backgroundColor: '#1A1612' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge 
              className="px-4 py-2 text-xs tracking-widest uppercase mb-4"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37', border: '1px solid #D4AF37' }}
            >
              Testimonios
            </Badge>
            <h2 
              className="text-3xl lg:text-5xl"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Voces de la <span style={{ color: '#D4AF37' }}>Comunidad</span>
            </h2>
          </div>

          <div className="relative">
            <Quote 
              className="absolute -top-4 -left-4 w-16 h-16 opacity-20"
              style={{ color: '#D4AF37' }}
            />
            <div 
              className="p-8 lg:p-12 rounded-2xl text-center"
              style={{ backgroundColor: '#0F0F0F', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              <p 
                className="text-xl lg:text-2xl mb-8 leading-relaxed"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="flex items-center justify-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#D4AF37' }} />
                ))}
              </div>
              <p className="text-sm opacity-70" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                {testimonials[currentTestimonial].role} — {testimonials[currentTestimonial].location}
              </p>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: currentTestimonial === index ? '#D4AF37' : 'rgba(212, 175, 55, 0.3)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="membresias" className="py-20 lg:py-32" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge 
              className="px-4 py-2 text-xs tracking-widest uppercase mb-4"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37', border: '1px solid #D4AF37' }}
            >
              Membresías
            </Badge>
            <h2 
              className="text-3xl lg:text-5xl mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Elige tu <span style={{ color: '#D4AF37' }}>Experiencia</span>
            </h2>
            <p className="text-lg opacity-70 max-w-2xl mx-auto" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
              Desde coleccionistas casuales hasta tiendas profesionales, tenemos un plan para ti
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Free Tier */}
            <Card 
              className="p-8 rounded-2xl"
              style={{ backgroundColor: '#1A1612', border: '1px solid rgba(212, 175, 55, 0.2)' }}
            >
              <div className="mb-8">
                <Disc3 className="w-10 h-10 mb-4" style={{ color: '#8B4513' }} />
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Explorador
                </h3>
                <p className="text-sm opacity-70" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                  Perfecto para comenzar tu viaje
                </p>
              </div>
              <div className="mb-8">
                <p className="text-4xl" style={{ fontFamily: 'Playfair Display, serif', color: '#D4AF37' }}>
                  Gratis
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {['Acceso al catálogo completo', 'Wishlist hasta 20 discos', 'Perfil básico de coleccionista', 'Alertas de nuevos discos'].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                    <span className="text-sm opacity-80" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline"
                className="w-full py-6 tracking-wider uppercase"
                style={{ borderColor: '#D4AF37', color: '#D4AF37', backgroundColor: 'transparent' }}
              >
                Comenzar Gratis
              </Button>
            </Card>

            {/* Premium Tier */}
            <Card 
              className="p-8 rounded-2xl relative"
              style={{ backgroundColor: '#1A1612', border: '2px solid #D4AF37', boxShadow: '0 0 40px rgba(212, 175, 55, 0.2)' }}
            >
              <Badge 
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1"
                style={{ backgroundColor: '#D4AF37', color: '#0F0F0F' }}
              >
                Más Popular
              </Badge>
              <div className="mb-8">
                <Sparkles className="w-10 h-10 mb-4" style={{ color: '#D4AF37' }} />
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Coleccionista
                </h3>
                <p className="text-sm opacity-70" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                  Para el entusiasta dedicado
                </p>
              </div>
              <div className="mb-8">
                <p className="text-4xl" style={{ fontFamily: 'Playfair Display, serif', color: '#D4AF37' }}>
                  Premium
                </p>
                <p className="text-sm opacity-70">Consultar precio mensual</p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Todo lo del plan Explorador',
                  'Wishlist ilimitada',
                  'Servicio de búsqueda personalizada',
                  'Acceso anticipado a nuevos ingresos',
                  'Descuentos exclusivos',
                  'Perfil destacado'
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                    <span className="text-sm opacity-80" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full py-6 tracking-wider uppercase"
                style={{ backgroundColor: '#D4AF37', color: '#0F0F0F' }}
              >
                Obtener Membresía
              </Button>
            </Card>

            {/* Shop Owner Tier */}
            <Card 
              className="p-8 rounded-2xl"
              style={{ backgroundColor: '#1A1612', border: '1px solid rgba(212, 175, 55, 0.2)' }}
            >
              <div className="mb-8">
                <TrendingUp className="w-10 h-10 mb-4" style={{ color: '#8B4513' }} />
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Vendedor
                </h3>
                <p className="text-sm opacity-70" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                  Para tiendas y vendedores profesionales
                </p>
              </div>
              <div className="mb-8">
                <p className="text-4xl" style={{ fontFamily: 'Playfair Display, serif', color: '#D4AF37' }}>
                  Business
                </p>
                <p className="text-sm opacity-70">Consultar precio mensual</p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Todo lo del plan Coleccionista',
                  'Panel de administración de inventario',
                  'Listados ilimitados',
                  'Comisiones reducidas',
                  'Verificación de vendedor',
                  'Soporte prioritario'
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                    <span className="text-sm opacity-80" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline"
                className="w-full py-6 tracking-wider uppercase"
                style={{ borderColor: '#D4AF37', color: '#D4AF37', backgroundColor: 'transparent' }}
              >
                Contactar Ventas
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Split with Form */}
      <section className="py-20 lg:py-32" style={{ backgroundColor: '#1A1612' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Badge 
                className="px-4 py-2 text-xs tracking-widest uppercase mb-6"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37', border: '1px solid #D4AF37' }}
              >
                Pedidos Especiales
              </Badge>
              <h2 
                className="text-3xl lg:text-5xl mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                ¿Buscas algo <span style={{ color: '#D4AF37' }}>especial</span>?
              </h2>
              <p 
                className="text-lg opacity-70 mb-8"
                style={{ fontFamily: 'Source Sans Pro, sans-serif' }}
              >
                Nuestro equipo de cazadores de vinilos puede encontrar ese disco que llevas años buscando. Completa el formulario y nos pondremos en contacto contigo.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#D4AF37', border: '2px solid #1A1612' }}
                    >
                      <Disc3 className="w-5 h-5" style={{ color: '#0F0F0F' }} />
                    </div>
                  ))}
                </div>
                <p className="text-sm opacity-70">Más de 500 discos raros encontrados este año</p>
              </div>
            </div>

            <div 
              className="p-8 lg:p-10 rounded-2xl"
              style={{ backgroundColor: '#0F0F0F', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              {formStatus === 'success' ? (
                <div className="text-center py-12">
                  <Check className="w-16 h-16 mx-auto mb-4" style={{ color: '#D4AF37' }} />
                  <h3 className="text-2xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="opacity-70" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                    Nuestro equipo se pondrá en contacto contigo pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2 tracking-wider uppercase" style={{ fontFamily: 'Source Sans Pro, sans-serif', color: '#D4AF37' }}>
                      Nombre
                    </label>
                    <Input 
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full py-3 px-4 rounded-lg"
                      style={{ backgroundColor: '#1A1612', border: '1px solid rgba(212, 175, 55, 0.3)', color: '#F5E6D3' }}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 tracking-wider uppercase" style={{ fontFamily: 'Source Sans Pro, sans-serif', color: '#D4AF37' }}>
                      Email
                    </label>
                    <Input 
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full py-3 px-4 rounded-lg"
                      style={{ backgroundColor: '#1A1612', border: '1px solid rgba(212, 175, 55, 0.3)', color: '#F5E6D3' }}
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 tracking-wider uppercase" style={{ fontFamily: 'Source Sans Pro, sans-serif', color: '#D4AF37' }}>
                      Género de Interés
                    </label>
                    <Input 
                      type="text"
                      value={formState.genre}
                      onChange={(e) => setFormState({ ...formState, genre: e.target.value })}
                      className="w-full py-3 px-4 rounded-lg"
                      style={{ backgroundColor: '#1A1612', border: '1px solid rgba(212, 175, 55, 0.3)', color: '#F5E6D3' }}
                      placeholder="Ej: Jazz, Rock, Salsa..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 tracking-wider uppercase" style={{ fontFamily: 'Source Sans Pro, sans-serif', color: '#D4AF37' }}>
                      ¿Qué estás buscando?
                    </label>
                    <Textarea 
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full py-3 px-4 rounded-lg resize-none"
                      style={{ backgroundColor: '#1A1612', border: '1px solid rgba(212, 175, 55, 0.3)', color: '#F5E6D3' }}
                      placeholder="Describe el disco que buscas: artista, álbum, año, edición preferida..."
                    />
                  </div>
                  {formStatus === 'error' && (
                    <p className="text-red-400 text-sm">Hubo un error al enviar. Por favor intenta de nuevo.</p>
                  )}
                  <Button 
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full py-6 tracking-wider uppercase transition-all duration-300"
                    style={{ backgroundColor: '#D4AF37', color: '#0F0F0F' }}
                  >
                    {formStatus === 'loading' ? 'Enviando...' : 'Enviar Solicitud'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 lg:py-20" style={{ backgroundColor: '#0F0F0F', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <Disc3 className="w-10 h-10" style={{ color: '#D4AF37' }} />
                <span className="text-2xl font-serif" style={{ fontFamily: 'Playfair Display, serif', color: '#D4AF37' }}>
                  Vintage Vinyl
                </span>
              </Link>
              <p className="text-sm opacity-70 mb-6" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                La comunidad de vinilo más grande de Latinoamérica. Conectando coleccionistas apasionados desde 2020.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full transition-colors hover:opacity-70" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                  <Instagram className="w-5 h-5" style={{ color: '#D4AF37' }} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full transition-colors hover:opacity-70" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                  <Facebook className="w-5 h-5" style={{ color: '#D4AF37' }} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full transition-colors hover:opacity-70" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                  <Twitter className="w-5 h-5" style={{ color: '#D4AF37' }} />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm tracking-wider uppercase mb-6" style={{ fontFamily: 'Source Sans Pro, sans-serif', color: '#D4AF37' }}>
                Explorar
              </h4>
              <ul className="space-y-3">
                {['Catálogo Completo', 'Géneros', 'Nuevos Ingresos', 'Ofertas'].map((item) => (
                  <li key={item}>
                    <Link href="#catalogo" className="text-sm opacity-70 hover:opacity-100 transition-opacity" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm tracking-wider uppercase mb-6" style={{ fontFamily: 'Source Sans Pro, sans-serif', color: '#D4AF37' }}>
                Membresías
              </h4>
              <ul className="space-y-3">
                {['Plan Explorador', 'Plan Coleccionista', 'Plan Vendedor', 'Comparar Planes'].map((item) => (
                  <li key={item}>
                    <Link href="#membresias" className="text-sm opacity-70 hover:opacity-100 transition-opacity" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm tracking-wider uppercase mb-6" style={{ fontFamily: 'Source Sans Pro, sans-serif', color: '#D4AF37' }}>
                Contacto
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:hola@vintagevinyl.lat" className="text-sm opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                    <Mail className="w-4 h-4" />
                    hola@vintagevinyl.lat
                  </a>
                </li>
                <li className="text-sm opacity-70" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                  Latinoamérica
                </li>
              </ul>
            </div>
          </div>

          <div 
            className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}
          >
            <p className="text-sm opacity-50" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
              © 2024 Vintage Vinyl. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm opacity-50 hover:opacity-70 transition-opacity" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                Términos de Servicio
              </Link>
              <Link href="#" className="text-sm opacity-50 hover:opacity-70 transition-opacity" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}