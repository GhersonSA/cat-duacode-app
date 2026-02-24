import { useEffect, useRef } from 'react';
import { View, Image, Animated, Easing } from 'react-native';

export const LoadingScreen = () => {
    const logoScale = useRef(new Animated.Value(0)).current;
    const logoRotate = useRef(new Animated.Value(0)).current;
    const dotsContainerOpacity = useRef(new Animated.Value(0)).current;
    const pulse = useRef(new Animated.Value(1)).current;
    const ringScale = useRef(new Animated.Value(0.6)).current;
    const ringOpacity = useRef(new Animated.Value(0)).current;
    const dotsOpacity = useRef([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
    ]).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(logoScale, {
                toValue: 1,
                tension: 50,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.timing(logoRotate, {
                toValue: 1,
                duration: 600,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
            }),
        ]).start();

        setTimeout(() => {
            Animated.timing(dotsContainerOpacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }, 500);

        setTimeout(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulse, {
                        toValue: 1.08,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulse, {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        }, 600);

        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(ringScale, {
                        toValue: 1.8,
                        duration: 1500,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(ringOpacity, {
                        toValue: 0.4,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.timing(ringOpacity, {
                    toValue: 0,
                    duration: 1200,
                    useNativeDriver: true,
                }),
                Animated.timing(ringScale, {
                    toValue: 0.6,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ]),
        ).start();

        const animateDots = () => {
            dotsOpacity.forEach((dot, i) => dot.setValue(0));
            Animated.stagger(200, [
                ...dotsOpacity.map((dot) =>
                    Animated.sequence([
                        Animated.timing(dot, {
                            toValue: 1,
                            duration: 300,
                            useNativeDriver: true,
                        }),
                        Animated.timing(dot, {
                            toValue: 0.3,
                            duration: 300,
                            useNativeDriver: true,
                        }),
                    ]),
                ),
            ]).start(() => animateDots());
        };
        setTimeout(animateDots, 800);
    }, []);

    const spin = logoRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['-10deg', '0deg'],
    });

    return (
        <View className="flex-1 items-center justify-center bg-brand-light">
            <Animated.View
                className="absolute w-48 h-48 rounded-full"
                style={{
                    borderWidth: 2,
                    borderColor: '#8B5CF6',
                    opacity: ringOpacity,
                    transform: [{ scale: ringScale }],
                }} />

            <Animated.View
                style={{
                    transform: [{ scale: Animated.multiply(logoScale, pulse) }, { rotate: spin }],
                }} >
                <Image
                    source={require('@assets/duacat-logo-1.webp')}
                    className="w-48 h-48"
                    resizeMode="contain" />
            </Animated.View>

            <Animated.View
                style={{ opacity: dotsContainerOpacity }}
                className="flex-row mt-6 gap-2" >
                {dotsOpacity.map((dot, i) => (
                    <Animated.View
                        key={i}
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: '#8B5CF6', opacity: dot }} />
                ))}
            </Animated.View>
        </View>
    );
};
